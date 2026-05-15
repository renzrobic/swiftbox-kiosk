import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { CheckCircle2 } from 'lucide-react-native';

export const SuccessScreen = ({ isRider, onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  
  useEffect(() => {
    SwiftVoice.say("Operation complete. Thank you.");

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 15,
        friction: 6,
        useNativeDriver: true,
      })
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Transaction Complete</Text>
      </Animated.View>
      
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconContainer}>
          <CheckCircle2 color={THEME.COLORS.SUCCESS} size={140} strokeWidth={1} />
        </View>
        <Text style={styles.title}>
          {isRider ? "Delivery Successful" : "Parcel Claimed"}
        </Text>
        <Text style={styles.subtitle}>
          The transaction has been secured and the session is now complete.
          {isRider ? " The recipient has been notified via SMS." : ""}
        </Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.finishButton} 
          onPress={onFinish}
          activeOpacity={0.8}
        >
          <Text style={styles.finishText}>Finish</Text>
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
  header: { 
    position: 'absolute',
    top: THEME.SPACING.G80,
    alignItems: 'center', 
  },
  logo: { 
    width: 140, 
    height: 40, 
    marginBottom: THEME.SPACING.G80, // PERFECT RATIO
  },
  headerTitle: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 24,
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 680,
    marginTop: THEME.SPACING.G80,
  },
  iconContainer: {
    marginBottom: THEME.SPACING.G48,
  },
  title: { 
    fontFamily: THEME.FONTS.FAMILY_BOLD, 
    fontSize: 56, 
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 56,
    textAlign: 'center',
    lineHeight: 56 * THEME.FONTS.LINE_HEIGHT_MULT,
  },
  subtitle: { 
    fontFamily: THEME.FONTS.FAMILY_MEDIUM, 
    fontSize: 24, 
    color: THEME.COLORS.SECONDARY_LABEL, 
    marginTop: THEME.SPACING.G24, 
    textAlign: 'center',
    lineHeight: 34,
  },
  footer: {
    position: 'absolute',
    bottom: THEME.SPACING.G64,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: { 
    backgroundColor: THEME.COLORS.ACCENT,
    paddingVertical: THEME.SPACING.G24,
    paddingHorizontal: THEME.SPACING.G120,
    borderRadius: THEME.SPACING.RADIUS_BUTTON, // FULL PILL (100)
    width: 420,
    alignItems: 'center',
    ...THEME.SHADOWS.MD,
  },
  finishText: {
    color: THEME.COLORS.WHITE,
    fontSize: 22,
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    letterSpacing: THEME.FONTS.TRACKING_BODY * 22,
  },
});