import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { CustomKeypad } from '../components/CustomKeypad';

export const RiderPhoneScreen = ({ onNext, onBack }) => {
  const [phone, setPhone] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SwiftVoice.say("Enter the recipient's phone number.");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleKeyPress = (num) => {
    if (phone.length < 11) setPhone(prev => prev + num);
  };

  const handleDelete = () => {
    setPhone(prev => prev.slice(0, -1));
  };

  const formatPhone = (val) => {
    if (!val) return "09XX XXX XXXX";
    const cleaned = val.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 4) formatted = cleaned.slice(0, 4) + ' ' + cleaned.slice(4);
    if (cleaned.length > 7) formatted = formatted.slice(0, 8) + ' ' + formatted.slice(8);
    return formatted;
  };

  const handleSubmit = () => {
    if (phone.length === 11) {
      onNext(phone);
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
        <Text style={styles.title}>Phone Number</Text>
        <Text style={styles.subtitle}>Enter the 11-digit mobile number for secure alerts</Text>
      </Animated.View>

      <Animated.View style={[styles.numpadContainer, { opacity: fadeAnim }]}>
        <View style={styles.displayContainer}>
          <Text style={[styles.displayText, !phone && styles.placeholderText]}>
            {formatPhone(phone)}
          </Text>
        </View>

        <CustomKeypad 
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
          onAction={handleSubmit}
          actionLabel="Set Phone Number"
        />
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={onBack} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Go Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME.COLORS.BACKGROUND, 
    alignItems: 'center', 
  },
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
    textAlign: 'center',
  },
  numpadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 340,
  },
  displayContainer: {
    width: 640,
    height: 120,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: THEME.SPACING.RADIUS_L,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.SPACING.G48,
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