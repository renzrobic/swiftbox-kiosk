import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { Scan, QrCode } from 'lucide-react-native';

export const ScannerScreen = ({ mode, onNavigate, onScan }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SwiftVoice.say("Please scan the QR code.");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (data) {
      onScan(data); 
    }
  };

  if (!permission || !permission.granted) {
    return (
      <View style={styles.center}>
        <QrCode color={THEME.COLORS.LABEL} size={64} style={{ marginBottom: 24 }} />
        <Text style={styles.errorText}>Camera access is required for scanning.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Allow camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Scan QR code</Text>
      </Animated.View>

      <Animated.View style={[styles.cameraContainer, { opacity: fadeAnim }]}>
        <View style={styles.cameraFrame}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={handleBarCodeScanned}
            facing="front"
          />
          <View style={styles.overlay}>
            <Scan color={THEME.COLORS.WHITE} size={120} strokeWidth={1} />
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.manualButton} 
          onPress={() => onNavigate('MANUAL_ENTRY')}
          activeOpacity={0.8}
        >
          <Text style={styles.manualButtonText}>Enter manually</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => onNavigate('MAIN_MENU')}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME.COLORS.BACKGROUND, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: THEME.COLORS.BACKGROUND,
    padding: THEME.SPACING.G40 
  },
  header: { 
    position: 'absolute',
    top: THEME.SPACING.G80,
    alignItems: 'center', 
  },
  logo: { 
    width: 120, 
    height: 40, 
    marginBottom: THEME.SPACING.G24 
  },
  title: { 
    fontFamily: THEME.FONTS.FAMILY_BOLD, 
    fontSize: 32, 
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 32,
  },
  cameraContainer: { 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cameraFrame: {
    width: 480,
    height: 480,
    borderRadius: THEME.SPACING.RADIUS_L,
    overflow: 'hidden',
    backgroundColor: THEME.COLORS.WHITE,
    ...THEME.SHADOWS.APPLE_PREMIUM,
  },
  camera: { flex: 1 },
  overlay: { 
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  footer: { 
    position: 'absolute',
    bottom: THEME.SPACING.G64,
    alignItems: 'center',
    width: '100%',
  },
  manualButton: { 
    backgroundColor: THEME.COLORS.ACCENT,
    paddingVertical: THEME.SPACING.G24,
    paddingHorizontal: THEME.SPACING.G80,
    borderRadius: THEME.SPACING.RADIUS_BUTTON,
    width: 420,
    alignItems: 'center',
    ...THEME.SHADOWS.MD,
  },
  manualButtonText: {
    color: THEME.COLORS.WHITE,
    fontSize: 22,
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    letterSpacing: THEME.FONTS.TRACKING_BODY * 22,
  },
  cancelButton: {
    marginTop: THEME.SPACING.G24,
    padding: THEME.SPACING.G16,
  },
  cancelText: { 
    color: THEME.COLORS.SECONDARY_LABEL, 
    fontSize: 20, 
    fontFamily: THEME.FONTS.FAMILY_MEDIUM, 
    textDecorationLine: 'underline',
  },
  errorText: { 
    marginBottom: 32, 
    fontSize: 20, 
    fontFamily: THEME.FONTS.FAMILY_MEDIUM, 
    color: THEME.COLORS.LABEL, 
    textAlign: 'center' 
  },
  permissionButton: {
    backgroundColor: THEME.COLORS.ACCENT,
    padding: 20,
    borderRadius: 12
  },
  permissionButtonText: {
    color: 'white',
    fontFamily: THEME.FONTS.FAMILY_BOLD
  }
});