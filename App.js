import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { THEME } from './src/constants/theme';
import * as SplashScreen from 'expo-splash-screen';

// --- FONT IMPORTS ---
import { 
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black 
} from '@expo-google-fonts/inter';

// --- SCREEN IMPORTS ---
import { StandbyScreen } from './src/screens/StandbyScreen';
import { MainMenuScreen } from './src/screens/MainMenuScreen';
import { ScannerScreen } from './src/screens/ScannerScreen';
import { ManualEntryScreen } from './src/screens/ManualEntryScreen';
import { ProcessingScreen } from './src/screens/ProcessingScreen';
import { LockerActionScreen } from './src/screens/LockerActionScreen';
import { SuccessScreen } from './src/screens/SuccessScreen';
import { RiderNameScreen } from './src/screens/RiderNameScreen';
import { RiderPhoneScreen } from './src/screens/RiderPhoneScreen';
import { LockerSizeScreen } from './src/screens/LockerSizeScreen';
import { RiderSummaryScreen } from './src/screens/RiderSummaryScreen';
import { HelpScreen } from './src/screens/HelpScreen';
import { LegalScreen } from './src/screens/LegalScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { FeedbackScreen } from './src/screens/FeedbackScreen';
import { ReturnScreen } from './src/screens/ReturnScreen';
import { LockerFullScreen } from './src/screens/LockerFullScreen';
import { AuthErrorScreen } from './src/screens/AuthErrorScreen';
import { MaintenanceScreen } from './src/screens/MaintenanceScreen';

// --- SERVICE IMPORTS ---
import { FirebaseService } from './src/services/firebaseService';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Inter-Black': Inter_900Black,
  });

  const [currentScreen, setCurrentScreen] = useState('STANDBY');
  
  const [sessionData, setSessionData] = useState({
    mode: null,
    parcelId: null,
    recipientName: '',
    recipientPhone: '',
    lockerSize: 'M',
    lockerId: null,
    loadingMessage: '',
    rating: 0,
    claimPin: '',
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // --- LOGIC HANDLERS ---
  const handleInitialInput = async (idInput) => {
    if (sessionData.mode === 'RIDER') {
      setSessionData(prev => ({ ...prev, parcelId: idInput }));
      setCurrentScreen('RIDER_NAME');
    } else {
      handleParcelDiscovery(idInput);
    }
  };

  const handleParcelDiscovery = async (parcelId) => {
    setCurrentScreen('PROCESSING');
    setSessionData(prev => ({ ...prev, loadingMessage: "Identifying Parcel..." }));

    try {
      const parcelData = await FirebaseService.getParcel(parcelId);
      if (parcelData && parcelData.status === 'IN_LOCKER') {
        setSessionData(prev => ({ 
          ...prev, 
          parcelId: parcelId, 
          lockerId: parcelData.locker_id,
          recipientPhone: parcelData.recipient_phone 
        }));
        setTimeout(() => setCurrentScreen('OTP_ENTRY'), 1000);
      } else {
        Alert.alert("Parcel Not Found", "This ID is not currently stored in any locker.");
        setCurrentScreen('MAIN_MENU');
      }
    } catch (error) {
      setCurrentScreen('AUTH_ERROR');
    }
  };

  const handlePinVerification = async (enteredPin) => {
    setCurrentScreen('PROCESSING');
    setSessionData(prev => ({ ...prev, loadingMessage: "Verifying Access Key..." }));

    try {
      const isValid = await FirebaseService.verifyParcelPin(sessionData.parcelId, enteredPin);
      if (isValid) {
        setTimeout(() => setCurrentScreen('LOCKER_ACTION'), 1500);
      } else {
        Alert.alert("Access Denied", "Incorrect PIN for this specific parcel.");
        setCurrentScreen('MAIN_MENU');
      }
    } catch (error) {
      setCurrentScreen('AUTH_ERROR');
    }
  };

  const handleFinalSubmit = async () => {
    setCurrentScreen('PROCESSING');
    setSessionData(prev => ({ ...prev, loadingMessage: "Locker Assignment..." }));

    try {
      const existingLocker = await FirebaseService.findLockerByPhone(sessionData.recipientPhone);
      const targetLocker = existingLocker || "L01"; 

      await FirebaseService.assignParcelToLocker(
        sessionData.parcelId, 
        sessionData.recipientPhone,
        targetLocker
      );

      setSessionData(prev => ({ ...prev, lockerId: targetLocker }));
      setTimeout(() => setCurrentScreen('LOCKER_ACTION'), 2500);
    } catch (error) {
      Alert.alert("System Error", "Could not complete delivery.");
      setCurrentScreen('MAIN_MENU');
    }
  };

  if (!fontsLoaded) return null;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'STANDBY':
        return <StandbyScreen onStart={() => setCurrentScreen('MAIN_MENU')} />;
      
      case 'MAIN_MENU':
        return (
          <MainMenuScreen 
            onNavigate={(flow) => {
              if (flow === 'HELP') return setCurrentScreen('HELP');
              if (flow === 'ABOUT') return setCurrentScreen('ABOUT');
              const selectedMode = flow === 'RIDER_FLOW' ? 'RIDER' : 'CUSTOMER';
              setSessionData(prev => ({ ...prev, mode: selectedMode }));
              setCurrentScreen(flow);
            }} 
          />
        );

      case 'RIDER_FLOW':
      case 'CUSTOMER_FLOW':
        return <ScannerScreen mode={sessionData.mode} onNavigate={setCurrentScreen} onScan={handleInitialInput} />;

      case 'MANUAL_ENTRY':
        return (
          <ManualEntryScreen 
            mode={sessionData.mode} 
            onBack={() => setCurrentScreen(sessionData.mode === 'RIDER' ? 'RIDER_FLOW' : 'CUSTOMER_FLOW')}
            onConfirm={handleInitialInput} 
          />
        );

      case 'OTP_ENTRY':
        return (
          <ManualEntryScreen 
            mode="CUSTOMER_PIN" 
            onBack={() => setCurrentScreen('MAIN_MENU')}
            onConfirm={handlePinVerification} 
          />
        );

      case 'RIDER_NAME':
        return <RiderNameScreen onNext={(val) => { setSessionData(p => ({...p, recipientName: val})); setCurrentScreen('RIDER_PHONE'); }} onCancel={() => setCurrentScreen('MAIN_MENU')} />;
      
      case 'RIDER_PHONE':
        return <RiderPhoneScreen onNext={(val) => { setSessionData(p => ({...p, recipientPhone: val})); setCurrentScreen('RIDER_SIZE'); }} onBack={() => setCurrentScreen('RIDER_NAME')} />;

      case 'RIDER_SIZE':
        return <LockerSizeScreen onSelect={(val) => { setSessionData(p => ({...p, lockerSize: val})); setCurrentScreen('RIDER_SUMMARY'); }} onBack={() => setCurrentScreen('RIDER_PHONE')} />;

      case 'RIDER_SUMMARY':
        return <RiderSummaryScreen data={sessionData} onConfirm={handleFinalSubmit} onEdit={() => setCurrentScreen('RIDER_NAME')} />;

      case 'PROCESSING':
        return <ProcessingScreen message={sessionData.loadingMessage} />;

      case 'LOCKER_ACTION':
        return <LockerActionScreen lockerId={sessionData.lockerId} isRider={sessionData.mode === 'RIDER'} onClose={() => setCurrentScreen(sessionData.mode === 'RIDER' ? 'SUCCESS_RIDER' : 'SUCCESS_CUSTOMER')} />;

      case 'SUCCESS_RIDER':
      case 'SUCCESS_CUSTOMER':
        return (
          <SuccessScreen 
            isRider={sessionData.mode === 'RIDER'} 
            onFinish={async () => {
              if (sessionData.mode === 'CUSTOMER') {
                await FirebaseService.releaseLocker(sessionData.parcelId, sessionData.lockerId);
              }
              setCurrentScreen('FEEDBACK');
            }} 
          />
        );

      case 'FEEDBACK':
        return <FeedbackScreen onFinish={() => setCurrentScreen('STANDBY')} />;
      
      case 'HELP':
        return <HelpScreen onBack={() => setCurrentScreen('MAIN_MENU')} />;
      
      case 'ABOUT':
        return <AboutScreen onBack={() => setCurrentScreen('MAIN_MENU')} />;
      
      case 'LEGAL':
        return <LegalScreen onBack={() => setCurrentScreen('MAIN_MENU')} />;

      case 'RETURN_FLOW':
        return <ReturnScreen onConfirm={(code) => setCurrentScreen('PROCESSING')} onBack={() => setCurrentScreen('MAIN_MENU')} />;

      case 'AUTH_ERROR':
        return <AuthErrorScreen onRetry={() => setCurrentScreen('MAIN_MENU')} onCancel={() => setCurrentScreen('STANDBY')} />;
      
      case 'LOCKER_FULL':
        return <LockerFullScreen onBack={() => setCurrentScreen('STANDBY')} />;

      case 'MAINTENANCE':
        return <MaintenanceScreen />;

      default:
        return <StandbyScreen onStart={() => setCurrentScreen('MAIN_MENU')} />;
    }
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar hidden />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.WHITE,
  },
});