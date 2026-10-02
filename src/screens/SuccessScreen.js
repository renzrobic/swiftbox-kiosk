import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { CheckCircle2 } from 'lucide-react-native';

export const SuccessScreen = ({ isRider, parcelId, lockerId, recipientPhone, claimPin, onFinish }) => {
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
          <CheckCircle2 color={THEME.COLORS.SUCCESS} size={110} strokeWidth={1} />
        </View>
        <Text style={styles.title}>
          {isRider ? "Delivery Successful" : "Parcel Claimed"}
        </Text>
        <Text style={styles.subtitle}>
          The transaction has been secured and the session is now complete.
          {isRider ? " The recipient has been notified via SMS." : ""}
        </Text>

        {isRider && (
          <View style={styles.smsCard}>
            <View style={styles.smsHeader}>
              <Text style={styles.smsBadge}>SIMULATED SMS DISPATCH</Text>
              <Text style={styles.smsPhone}>Recipient: {recipientPhone || 'N/A'}</Text>
            </View>
            <View style={styles.smsRow}>
              <Text style={styles.smsLockerText}>
                Compartment: <Text style={styles.smsBold}>{lockerId || 'Assigned'}</Text>
              </Text>
              <View style={styles.pinPill}>
                <Text style={styles.pinLabel}>CLAIM PIN</Text>
                <Text style={styles.pinCode}>{claimPin || '----'}</Text>
              </View>
            </View>
            <Text style={styles.smsSubtext}>
              In production, this 4-digit PIN is texted to {recipientPhone || 'the recipient'} for terminal pickup.
            </Text>
          </View>
        )}
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
  smsCard: {
    marginTop: THEME.SPACING.G32,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: THEME.SPACING.RADIUS_M,
    padding: THEME.SPACING.G24,
    width: '100%',
    minWidth: 460,
    alignItems: 'center',
  },
  smsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: THEME.SPACING.G16,
    paddingBottom: THEME.SPACING.G8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  smsBadge: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 12,
    color: '#059669',
    letterSpacing: 0.5,
  },
  smsPhone: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 14,
    color: THEME.COLORS.SECONDARY_LABEL,
  },
  smsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: THEME.SPACING.G8,
  },
  smsLockerText: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 18,
    color: THEME.COLORS.LABEL,
  },
  smsBold: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
  },
  pinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  pinLabel: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginRight: 8,
  },
  pinCode: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 22,
    color: '#FBBF24',
    letterSpacing: 2,
  },
  smsSubtext: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 13,
    color: THEME.COLORS.SECONDARY_LABEL,
    textAlign: 'center',
    marginTop: THEME.SPACING.G16,
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