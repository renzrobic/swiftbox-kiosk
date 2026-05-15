import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { THEME } from '../constants/theme';
import { Star } from 'lucide-react-native';

export const FeedbackScreen = ({ onFinish }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    // Auto-return to standby if no action taken
    const timer = setTimeout(() => {
      onFinish();
    }, 20000); // 20 second timeout

    return () => clearTimeout(timer);
  }, []);

  const handleRate = (val) => {
    setRating(val);
    // Subtle delay before auto-submitting
    setTimeout(() => {
      setSubmitted(true);
      // Brief pause on thank you screen before return
      setTimeout(() => {
        onFinish();
      }, 3000);
    }, 500);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.thankYouText}>Thank you for your feedback</Text>
        <Text style={styles.autoReturn}>Returning to home screen...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How was your experience?</Text>
      <Text style={styles.subtitle}>Help us improve the SwiftBox network</Text>

      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => handleRate(star)}
            activeOpacity={0.7}
            style={styles.starTouch}
          >
            <Star 
              size={64} 
              color={rating >= star ? THEME.COLORS.INK : 'rgba(0,0,0,0.05)'} 
              fill={rating >= star ? THEME.COLORS.INK : 'transparent'}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={onFinish} style={styles.skipBtn}>
        <Text style={styles.skipText}>Skip and exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME.COLORS.WHITE, 
    padding: 60, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD, 
    fontSize: 32, 
    textAlign: 'center', 
    color: THEME.COLORS.INK,
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontFamily: THEME.FONTS.FAMILY_MEDIUM, 
    fontSize: 18, 
    color: THEME.COLORS.SECONDARY_TEXT, 
    marginTop: 12, 
    marginBottom: 60,
    opacity: 0.4,
  },
  starRow: { 
    flexDirection: 'row', 
    marginBottom: 80 
  },
  starTouch: {
    marginHorizontal: 12,
  },
  thankYouText: {
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    fontSize: 28,
    color: THEME.COLORS.INK,
  },
  autoReturn: {
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    fontSize: 14,
    color: THEME.COLORS.SECONDARY_TEXT,
    marginTop: 16,
    opacity: 0.4,
  },
  skipBtn: {
    marginTop: 40,
  },
  skipText: {
    fontFamily: THEME.FONTS.FAMILY_SEMIBOLD,
    fontSize: 14,
    color: THEME.COLORS.SECONDARY_TEXT,
    opacity: 0.3,
    letterSpacing: 1,
  }
});