import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';

export const StandbyScreen = ({ onStart }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current; // Subtle slide

  useEffect(() => {
    SwiftVoice.say("Welcome.");

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200, // Cinematic fade
        useNativeDriver: true
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true
      })
    ]).start();

    return () => SwiftVoice.stop();
  }, []);

  return (
    <TouchableOpacity 
      activeOpacity={1} 
      onPress={onStart} 
      style={styles.container}
    >
      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.welcomeText}>Welcome to{"\n"}Swiftbox</Text>

        <View style={styles.promptContainer}>
          <Text style={styles.startText}>Tap anywhere to start</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 220,
    height: undefined,
    aspectRatio: 1.8,
    marginBottom: THEME.SPACING.G48, // Intentional spacing
  },
  welcomeText: {
    fontSize: 56,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.LABEL,
    textAlign: 'center',
    lineHeight: 56 * THEME.FONTS.LINE_HEIGHT_MULT,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 56,
    marginBottom: THEME.SPACING.G120, // Large intentional gap
  },
  promptContainer: {
    marginTop: THEME.SPACING.G24,
  },
  startText: {
    color: THEME.COLORS.SECONDARY_LABEL,
    fontSize: 18,
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    letterSpacing: THEME.FONTS.TRACKING_BODY * 18,
  },
});