import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { THEME } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export const GlowButton = ({ title, onPress, style, textStyle, variant = 'primary' }) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 4000, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 4000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const isPrimary = variant === 'primary';

  // Soft diffused shadow animation
  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [12, 24, 12]
  });

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 0.4, 0.2]
  });

  return (
    <View style={[styles.container, style]}>
      {isPrimary && (
        <Animated.View 
          style={[
            styles.glowShadow, 
            { 
              shadowRadius: shadowRadius, 
              shadowOpacity: shadowOpacity,
              shadowColor: THEME.COLORS.GLOW_CYAN 
            }
          ]} 
        />
      )}
      
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={onPress} 
        style={[styles.button, !isPrimary && styles.secondaryButton]}
      >
        <Text style={[styles.text, !isPrimary && styles.secondaryText, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    marginVertical: 12,
  },
  glowShadow: {
    position: 'absolute',
    inset: 4,
    borderRadius: THEME.SPACING.RADIUS_FULL,
    backgroundColor: 'white', // Required for shadow to render in RN
    shadowOffset: { width: 0, height: 0 },
  },
  button: {
    flex: 1,
    borderRadius: THEME.SPACING.RADIUS_FULL,
    backgroundColor: THEME.COLORS.INK,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...THEME.SHADOWS.MD,
  },
  secondaryButton: {
    backgroundColor: THEME.COLORS.WHITE,
    borderWidth: 1.5,
    borderColor: THEME.COLORS.INK,
    shadowOpacity: 0,
  },
  text: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    fontSize: 18,
    letterSpacing: 18 * THEME.FONTS.TRACKING_BODY,
    textAlign: 'center',
  },
  secondaryText: {
    color: THEME.COLORS.INK,
  }
});
