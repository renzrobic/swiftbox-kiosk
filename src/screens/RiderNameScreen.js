import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { User } from 'lucide-react-native';
import { CustomKeyboard } from '../components/CustomKeyboard';

export const RiderNameScreen = ({ onNext, onCancel }) => {
  const [name, setName] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SwiftVoice.say("Please enter the recipient's name.");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleKeyPress = (key) => {
    setName(prev => prev + key);
  };

  const handleDelete = () => {
    setName(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (name.length > 2) {
      onNext(name);
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
        <Text style={styles.title}>Recipient Name</Text>
        <Text style={styles.subtitle}>Specify the primary contact for this drop-off</Text>
      </Animated.View>
      
      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <User color={THEME.COLORS.LABEL} size={32} style={styles.inputIcon} />
        <View style={styles.displayArea}>
          <Text style={[styles.displayText, !name && styles.placeholderText]}>
            {name || "Type recipient name"}
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.keyboardArea, { opacity: fadeAnim }]}>
        <CustomKeyboard 
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
          onAction={handleSubmit}
          actionLabel="Set Recipient"
        />
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
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
    width: 640,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: THEME.SPACING.RADIUS_L,
    paddingHorizontal: THEME.SPACING.G40,
    height: 120,
    marginTop: 340,
    ...THEME.SHADOWS.APPLE_PREMIUM,
  },
  inputIcon: {
    marginRight: THEME.SPACING.G24,
    opacity: 0.2,
  },
  displayArea: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 32,
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    color: THEME.COLORS.LABEL,
  },
  placeholderText: {
    opacity: 0.15,
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