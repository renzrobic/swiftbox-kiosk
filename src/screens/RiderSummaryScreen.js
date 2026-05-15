import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { Package, User, Smartphone, Box } from 'lucide-react-native';

export const RiderSummaryScreen = ({ data, onConfirm, onEdit }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SwiftVoice.say("Please review delivery details.");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const SummaryItem = ({ icon: Icon, label, value }) => (
    <View style={styles.summaryItem}>
      <View style={styles.itemIcon}>
        <Icon color={THEME.COLORS.LABEL} size={28} strokeWidth={1} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.contentGroup}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Review Delivery</Text>
          <Text style={styles.subtitle}>Confirm details before assigning a locker</Text>
        </View>
        
        <View style={styles.card}>
          <SummaryItem icon={Package} label="Parcel ID" value={data.parcelId || "SBX-117QH"} />
          <View style={styles.divider} />
          <SummaryItem icon={User} label="Recipient" value={data.recipientName || "Not Specified"} />
          <View style={styles.divider} />
          <SummaryItem icon={Smartphone} label="Phone Number" value={data.recipientPhone || "Not Specified"} />
          <View style={styles.divider} />
          <SummaryItem icon={Box} label="Locker Size" value={data.lockerSize === 'S' ? 'Small' : data.lockerSize === 'M' ? 'Medium' : 'Large'} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={onConfirm}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmText}>Confirm Drop-off</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editText}>Edit Details</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME.COLORS.SECONDARY_BACKGROUND, // Elevated feel
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
  card: {
    width: 640,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: THEME.SPACING.RADIUS_L,
    padding: THEME.SPACING.G40,
    ...THEME.SHADOWS.APPLE_PREMIUM,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.SPACING.G24,
    paddingVertical: THEME.SPACING.G16,
  },
  itemIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEME.COLORS.SECONDARY_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 16,
    color: THEME.COLORS.SECONDARY_LABEL,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemValue: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 24,
    color: THEME.COLORS.LABEL,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: THEME.SPACING.G8,
  },
  footer: { 
    alignItems: 'center',
    marginTop: THEME.SPACING.G24,
  },
  confirmButton: { 
    backgroundColor: THEME.COLORS.ACCENT,
    paddingVertical: THEME.SPACING.G24,
    paddingHorizontal: THEME.SPACING.G80,
    borderRadius: THEME.SPACING.RADIUS_BUTTON,
    width: 420,
    alignItems: 'center',
    ...THEME.SHADOWS.MD,
  },
  confirmText: {
    color: THEME.COLORS.WHITE,
    fontSize: 22,
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    letterSpacing: THEME.FONTS.TRACKING_BODY * 22,
  },
  editButton: {
    marginTop: THEME.SPACING.G32,
    padding: THEME.SPACING.G16,
  },
  editText: { 
    color: THEME.COLORS.SECONDARY_LABEL, 
    fontSize: 20,
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    textDecorationLine: 'underline',
  }
});