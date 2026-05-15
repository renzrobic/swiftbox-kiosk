import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { Box } from 'lucide-react-native';

export const LockerSizeScreen = ({ onSelect, onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SwiftVoice.say("Select the required locker size.");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const sizes = [
    { id: 'S', label: 'SMALL', desc: 'Envelopes & Small Boxes' },
    { id: 'M', label: 'MEDIUM', desc: 'Standard Parcels & Shoeboxes' },
    { id: 'L', label: 'LARGE', desc: 'Large Boxes & Bulkier Items' }
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
          <Text style={styles.title}>Locker Dimensions</Text>
          <Text style={styles.subtitle}>Choose the most suitable compartment</Text>
        </View>
        
        <View style={styles.list}>
          {sizes.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.sizeCard} 
              onPress={() => onSelect(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <Box color={THEME.COLORS.LABEL} size={32} strokeWidth={1} />
                </View>
                <View>
                  <Text style={styles.sizeLabel}>{item.label}</Text>
                  <Text style={styles.sizeDesc}>{item.desc}</Text>
                </View>
              </View>
              <View style={styles.sizeBadge}>
                <Text style={styles.badgeText}>{item.id}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>Go Back</Text>
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
    justifyContent: 'center', // Master-Center
    alignItems: 'center' 
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
  list: {
    width: 680,
  },
  sizeCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: THEME.COLORS.WHITE, 
    padding: THEME.SPACING.G32, 
    borderRadius: THEME.SPACING.RADIUS_L, 
    marginBottom: THEME.SPACING.G16, 
    ...THEME.SHADOWS.FIGMA_CARD,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.SPACING.G24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: THEME.COLORS.SECONDARY_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeLabel: { 
    fontSize: 24, 
    fontFamily: THEME.FONTS.FAMILY_BOLD, 
    color: THEME.COLORS.LABEL,
  },
  sizeDesc: { 
    fontSize: 18, 
    fontFamily: THEME.FONTS.FAMILY_MEDIUM, 
    color: THEME.COLORS.SECONDARY_LABEL, 
    marginTop: 2,
  },
  sizeBadge: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: THEME.COLORS.INK, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  badgeText: { 
    fontFamily: THEME.FONTS.FAMILY_BOLD, 
    fontSize: 28, 
    color: THEME.COLORS.WHITE,
  },
  footer: {
    marginTop: THEME.SPACING.G24,
  },
  backButton: {
    padding: THEME.SPACING.G16,
  },
  backText: { 
    color: THEME.COLORS.SECONDARY_LABEL, 
    fontSize: 20,
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    textDecorationLine: 'underline',
  }
});