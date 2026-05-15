import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Keyboard } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { CustomKeypad } from '../components/CustomKeypad';
import { CustomKeyboard } from '../components/CustomKeyboard';

export const ManualEntryScreen = ({ mode, onConfirm, onBack }) => {
  const [value, setValue] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const isPinMode = mode === 'CUSTOMER_PIN';
  const isRider = mode === 'RIDER';

  const screenConfig = {
    title: isPinMode ? "Enter PIN" : (isRider ? "Parcel ID" : "Identify Parcel"),
    subtitle: isPinMode 
      ? "Enter your secure claim code" 
      : "Enter the tracking ID exactly as shown",
    placeholder: isPinMode ? "••••" : "SBX-0000",
  };

  useEffect(() => {
    SwiftVoice.say(`Enter ${screenConfig.title}.`);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [mode]);

  const handleKeyPress = (key) => {
    setValue(prev => prev + key);
  };

  const handleDelete = () => {
    setValue(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (value.length > 0) {
      onConfirm(value); 
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{screenConfig.title}</Text>
        <Text style={styles.subtitle}>{screenConfig.subtitle}</Text>
      </Animated.View>

      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <View style={styles.displayArea}>
          <Text style={[styles.displayText, !value && styles.placeholderText]}>
            {isPinMode && value ? '•'.repeat(value.length) : (value || screenConfig.placeholder)}
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.keyboardArea, { opacity: fadeAnim }]}>
        {isPinMode ? (
          <CustomKeypad 
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onAction={handleSubmit}
            actionLabel="Confirm PIN"
          />
        ) : (
          <CustomKeyboard 
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onAction={handleSubmit}
          />
        )}
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={onBack} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.COLORS.BACKGROUND, alignItems: 'center' },
  header: { 
    position: 'absolute',
    top: THEME.SPACING.G80,
    alignItems: 'center', 
  },
  logo: { 
    width: 120, 
    height: 40, 
    marginBottom: THEME.SPACING.G80,
  },
  title: { 
    fontFamily: THEME.FONTS.FAMILY_BOLD, 
    fontSize: 48, 
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 48,
  },
  subtitle: { 
    fontFamily: THEME.FONTS.FAMILY_MEDIUM, 
    fontSize: 22, 
    color: THEME.COLORS.SECONDARY_LABEL, 
    marginTop: THEME.SPACING.G12,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 340, // Precision spacing from title
  },
  displayArea: {
    width: 640,
    height: 120,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: THEME.SPACING.RADIUS_L,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.SHADOWS.APPLE_PREMIUM,
  },
  displayText: {
    fontSize: 56,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.LABEL,
    letterSpacing: 2,
  },
  placeholderText: {
    opacity: 0.1,
  },
  keyboardArea: {
    marginTop: THEME.SPACING.G48,
  },
  footer: { 
    position: 'absolute',
    bottom: THEME.SPACING.G64,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    padding: THEME.SPACING.G16,
  },
  cancelText: { 
    color: THEME.COLORS.SECONDARY_LABEL, 
    fontSize: 20,
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    textDecorationLine: 'underline',
  }
});