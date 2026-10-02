import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { Delete, ArrowRight } from 'lucide-react-native';

export const CustomKeypad = ({ onKeyPress, onDelete, onAction, actionLabel = "Enter" }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0];

  // ⌨️ Physical PC Keyboard Support for web testing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        onKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        onDelete();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress, onDelete, onAction]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {numbers.map((num, index) => (
          <View key={index} style={styles.keyWrapper}>
            {num !== '' && (
              <TouchableOpacity 
                style={styles.key} 
                onPress={() => onKeyPress(num.toString())}
                activeOpacity={0.6}
              >
                <Text style={styles.keyText}>{num}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <View style={styles.keyWrapper}>
          <TouchableOpacity 
            style={[styles.key, styles.deleteKey]} 
            onPress={onDelete}
            activeOpacity={0.6}
          >
            <Delete color={THEME.COLORS.LABEL} size={32} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onAction}
        activeOpacity={0.8}
      >
        <Text style={styles.actionText}>{actionLabel}</Text>
        <ArrowRight color={THEME.COLORS.WHITE} size={24} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 480,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  keyWrapper: {
    width: '33.33%',
    padding: THEME.SPACING.G8,
    alignItems: 'center',
  },
  key: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: THEME.COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.SHADOWS.SM,
  },
  keyText: {
    fontSize: 40,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.LABEL,
  },
  deleteKey: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: THEME.COLORS.ACCENT,
    width: '100%',
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.SPACING.G32,
    gap: THEME.SPACING.G16,
    ...THEME.SHADOWS.MD,
  },
  actionText: {
    fontSize: 24,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.WHITE,
    letterSpacing: THEME.FONTS.TRACKING_BODY * 24,
  }
});
