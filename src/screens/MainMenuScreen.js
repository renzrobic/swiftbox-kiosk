import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';
import { Package, Inbox } from 'lucide-react-native';

export const MainMenuScreen = ({ onNavigate }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SwiftVoice.say("Select your transaction.");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const MenuCard = ({ icon: Icon, label, onPress }) => (
    <TouchableOpacity 
      style={styles.menuCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Icon color={THEME.COLORS.LABEL} size={64} strokeWidth={1} />
      </View>
      <Text style={styles.cardLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Select transaction</Text>
      </Animated.View>

      <Animated.View style={[styles.menuContainer, { opacity: fadeAnim }]}>
        <MenuCard 
          icon={Package} 
          label="Drop-off" 
          onPress={() => onNavigate('RIDER_FLOW')} 
        />
        <MenuCard 
          icon={Inbox} 
          label="Claim" 
          onPress={() => onNavigate('CUSTOMER_FLOW')} 
        />
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => onNavigate('STANDBY')}
          activeOpacity={0.6}
        >
          <Text style={styles.backText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.SECONDARY_BACKGROUND,
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
    marginBottom: THEME.SPACING.G80, // INCREASED GAP FOR PERFECT RATIO
  },
  title: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 32,
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 32,
  },
  menuContainer: {
    flexDirection: 'row',
    gap: THEME.SPACING.G40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: THEME.SPACING.G120, // Pushes cards further down from the header
  },
  menuCard: {
    width: 360,
    height: 440,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 48, // Balanced curved card
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.SHADOWS.APPLE_PREMIUM,
  },
  iconContainer: {
    marginBottom: THEME.SPACING.G40,
  },
  cardLabel: {
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    fontSize: 28,
    color: THEME.COLORS.LABEL,
    letterSpacing: THEME.FONTS.TRACKING_HEADER * 28,
  },
  footer: {
    position: 'absolute',
    bottom: THEME.SPACING.G64,
  },
  backButton: {
    padding: THEME.SPACING.G16,
  },
  backText: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 20,
    color: THEME.COLORS.SECONDARY_LABEL,
    textDecorationLine: 'underline',
  },
});