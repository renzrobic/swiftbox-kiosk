import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';

export const LockerActionScreen = ({ lockerId, isRider, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SwiftVoice.say(`Your locker is ${lockerId || '02'}. Opening door.`);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const lockers = [
    { id: '01', active: false },
    { id: lockerId || '02', active: true },
    { id: '03', active: false }
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.contentGroup}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Locker Assignment</Text>
        </View>

        <View style={styles.gridContainer}>
          {lockers.map((locker) => (
            <View 
              key={locker.id} 
              style={[styles.lockerCard, locker.active && styles.activeCard]}
            >
              <Text style={[styles.lockerNumber, locker.active && styles.activeText]}>
                {locker.id}
              </Text>
              
              {locker.active && (
                <View style={styles.activeIndicator}>
                  <Text style={styles.indicatorText}>OPEN</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.statusArea}>
          <Text style={styles.statusMain}>Locker {lockerId || '02'} is ready</Text>
          <Text style={styles.statusSub}>The door has been unlocked automatically</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.closeBtn} 
          onPress={onClose}
          activeOpacity={0.8}
        >
          <Text style={styles.closeBtnText}>I have closed the door</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME.COLORS.BACKGROUND, 
    padding: THEME.SPACING.KIOSK_PADDING,
    alignItems: 'center',
    justifyContent: 'center', // Master-Center
  },
  contentGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: THEME.SPACING.G48,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: THEME.SPACING.G48 
  },
  logo: { 
    width: 120, 
    height: 40, 
    marginBottom: THEME.SPACING.G32 
  },
  title: { 
    fontFamily: THEME.FONTS.FAMILY_BOLD, 
    fontSize: 32, 
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 32,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    marginBottom: THEME.SPACING.G64,
  },
  lockerCard: {
    width: 160,
    height: 380,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: THEME.SPACING.RADIUS_L,
    marginHorizontal: THEME.SPACING.G16,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.15,
  },
  activeCard: {
    backgroundColor: THEME.COLORS.WHITE,
    opacity: 1,
    ...THEME.SHADOWS.APPLE_PREMIUM,
    borderWidth: 2,
    borderColor: THEME.COLORS.SUCCESS,
  },
  lockerNumber: {
    fontSize: 48,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.SECONDARY_LABEL,
  },
  activeText: {
    color: THEME.COLORS.LABEL,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: THEME.COLORS.SUCCESS,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
  },
  indicatorText: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 14,
    letterSpacing: 1,
  },
  statusArea: {
    alignItems: 'center',
  },
  statusMain: {
    fontSize: 28,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.LABEL,
    marginBottom: 8,
  },
  statusSub: {
    fontSize: 20,
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    color: THEME.COLORS.SECONDARY_LABEL,
    textAlign: 'center',
  },
  footer: { 
    width: '100%',
    alignItems: 'center',
    marginTop: THEME.SPACING.G24,
  },
  closeBtn: {
    backgroundColor: THEME.COLORS.ACCENT,
    paddingVertical: THEME.SPACING.G24,
    paddingHorizontal: THEME.SPACING.G80,
    borderRadius: THEME.SPACING.RADIUS_BUTTON,
    width: 440,
    alignItems: 'center',
    ...THEME.SHADOWS.MD,
  },
  closeBtnText: {
    color: THEME.COLORS.WHITE,
    fontSize: 22,
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    letterSpacing: THEME.FONTS.TRACKING_BODY * 22,
  }
});