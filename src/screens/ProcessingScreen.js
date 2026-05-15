import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';

export const ProcessingScreen = ({ message = "Processing...", subMessage }) => {
  
  useEffect(() => {
    SwiftVoice.say(message);
  }, [message]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <ActivityIndicator 
          size="large" 
          color={THEME.COLORS.INK} 
          style={{ transform: [{ scale: 1.5 }] }} 
        />

        <Text style={styles.mainText}>{message}</Text>
        
        {subMessage && (
          <Text style={styles.subText}>{subMessage}</Text>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.brand}>Encrypted session active</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    opacity: 0.8,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  mainText: {
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    fontSize: 24,
    color: THEME.COLORS.INK,
    marginTop: 60,
    textAlign: 'center',
    letterSpacing: 24 * THEME.FONTS.TRACKING_HEADER,
  },
  subText: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 18,
    color: THEME.COLORS.SECONDARY_TEXT,
    marginTop: 16,
    textAlign: 'center',
    opacity: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 80,
  },
  brand: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 12,
    color: 'rgba(0,0,0,0.15)',
    letterSpacing: 2,
  }
});