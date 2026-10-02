import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { Delete, ArrowRight } from 'lucide-react-native';

export const CustomKeyboard = ({ onKeyPress, onDelete, onAction, actionLabel = "Continue" }) => {
  const rows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  // ⌨️ Physical PC Keyboard Support for web testing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
      // Ignore functional modifier shortcuts
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        onAction();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        onDelete();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        onKeyPress(' ');
      } else if (e.key.length === 1) {
        // Alphanumeric characters and hyphen
        if (/^[a-zA-Z0-9\-]$/.test(e.key)) {
          e.preventDefault();
          onKeyPress(e.key.toUpperCase());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress, onDelete, onAction]);

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity 
              key={key} 
              style={[styles.key, rowIndex === 0 && styles.numberKey]} 
              onPress={() => onKeyPress(key)}
              activeOpacity={0.6}
            >
              <Text style={[styles.keyText, rowIndex === 0 && styles.numberKeyText]}>{key}</Text>
            </TouchableOpacity>
          ))}
          {rowIndex === rows.length - 1 && (
            <TouchableOpacity 
              style={[styles.key, styles.specialKey]} 
              onPress={onDelete}
              activeOpacity={0.6}
            >
              <Delete color={THEME.COLORS.LABEL} size={24} strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>
      ))}
      
      <View style={styles.bottomRow}>
        <TouchableOpacity 
          style={[styles.key, styles.spaceKey]} 
          onPress={() => onKeyPress(' ')}
          activeOpacity={0.6}
        >
          <Text style={styles.spaceText}>Space</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onAction}
          activeOpacity={0.8}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
          <ArrowRight color={THEME.COLORS.WHITE} size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 820,
    alignItems: 'center',
    padding: THEME.SPACING.G16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: THEME.SPACING.G12,
    gap: THEME.SPACING.G8,
    justifyContent: 'center',
    width: '100%',
  },
  key: {
    minWidth: 58,
    paddingHorizontal: 12,
    height: 70,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: THEME.SPACING.RADIUS_L,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.SHADOWS.SM,
  },
  numberKey: {
    backgroundColor: THEME.COLORS.SECONDARY_BACKGROUND || '#f4f4f6',
  },
  numberKeyText: {
    fontSize: 24,
    color: THEME.COLORS.LABEL,
  },
  keyText: {
    fontSize: 26,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.LABEL,
  },
  specialKey: {
    backgroundColor: THEME.COLORS.SECONDARY_BACKGROUND || '#f4f4f6',
    paddingHorizontal: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: THEME.SPACING.G12,
    gap: THEME.SPACING.G16,
    width: '100%',
    justifyContent: 'center',
  },
  spaceKey: {
    flex: 2,
    maxWidth: 400,
    backgroundColor: THEME.COLORS.WHITE,
  },
  spaceText: {
    fontSize: 18,
    fontFamily: THEME.FONTS.FAMILY_MEDIUM,
    color: THEME.COLORS.SECONDARY_LABEL,
    textTransform: 'uppercase',
  },
  actionButton: {
    flex: 1,
    maxWidth: 240,
    flexDirection: 'row',
    backgroundColor: THEME.COLORS.ACCENT,
    borderRadius: THEME.SPACING.RADIUS_BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...THEME.SHADOWS.MD,
  },
  actionText: {
    fontSize: 20,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.WHITE,
  }
});
