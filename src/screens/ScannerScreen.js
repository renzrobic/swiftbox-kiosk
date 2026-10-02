import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import jsQR from 'jsqr';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { Scan, QrCode } from 'lucide-react-native';

export const ScannerScreen = ({ mode, onNavigate, onScan }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scannedRef = useRef(false);

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

  const handleBarCodeScanned = (event) => {
    if (scannedRef.current) return;
    
    // Normalize payload across Web (nativeEvent.data) and Native (event.data)
    const rawData = 
      (typeof event === 'string' ? event : null) || 
      event?.data || 
      event?.nativeEvent?.data || 
      '';

    if (rawData && rawData.trim().length > 0) {
      scannedRef.current = true;
      console.log('📦 QR Code Scanned Successfully:', rawData);
      onScan(rawData.trim());
    }
  };

  // 🚀 Local Web Camera Frame Scanner (Direct 2D Canvas + jsQR Engine)
  // Bypasses web worker / CDN limits so webcam scanning works reliably in Chrome/Edge
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    let timer = null;
    let isMounted = true;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const scanVideoFrame = () => {
      if (!isMounted || scannedRef.current) return;

      try {
        const video = document.querySelector('video');
        if (video && video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'attemptBoth',
          });

          if (code && code.data && code.data.trim()) {
            console.log('✅ QR Code Detected by local jsQR engine:', code.data);
            handleBarCodeScanned(code.data);
            return;
          }
        }
      } catch (err) {
        console.warn('Frame scan notice:', err.message);
      }

      timer = setTimeout(scanVideoFrame, 200);
    };

    timer = setTimeout(scanVideoFrame, 600);

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!permission || !permission.granted) {
    return (
      <View style={styles.center}>
        <QrCode color={THEME.COLORS.LABEL} size={64} style={{ marginBottom: 24 }} />
        <Text style={styles.errorText}>Camera access is required for scanning.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Allow camera</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.manualButton, { marginTop: 24 }]} 
          onPress={() => onNavigate('MANUAL_ENTRY')}
        >
          <Text style={styles.manualButtonText}>Enter manually</Text>
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
        <Text style={styles.subtitle}>Hold QR pass in front of camera</Text>
      </Animated.View>

      <Animated.View style={[styles.cameraContainer, { opacity: fadeAnim }]}>
        <View style={styles.cameraFrame}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
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
    top: THEME.SPACING.G48 || 48,
    alignItems: 'center', 
  },
  logo: { 
    width: 120, 
    height: 36, 
    marginBottom: 12 
  },
  title: { 
    fontFamily: THEME.FONTS.FAMILY_BOLD, 
    fontSize: 32, 
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 32,
  },
  subtitle: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 14,
    color: THEME.COLORS.SECONDARY_LABEL,
    marginTop: 4,
  },
  cameraContainer: { 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 20,
  },
  cameraFrame: {
    width: 380,
    height: 380,
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
    bottom: THEME.SPACING.G40 || 40,
    alignItems: 'center',
    width: '100%',
  },
  manualButton: { 
    backgroundColor: THEME.COLORS.ACCENT,
    paddingVertical: 18,
    paddingHorizontal: THEME.SPACING.G80,
    borderRadius: THEME.SPACING.RADIUS_BUTTON,
    width: 380,
    alignItems: 'center',
    ...THEME.SHADOWS.MD,
  },
  manualButtonText: {
    color: THEME.COLORS.WHITE,
    fontSize: 20,
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    letterSpacing: THEME.FONTS.TRACKING_BODY * 20,
  },
  cancelButton: {
    marginTop: 14,
    padding: 10,
  },
  cancelText: { 
    color: THEME.COLORS.SECONDARY_LABEL, 
    fontSize: 16, 
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