import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { Delete, ArrowRight } from 'lucide-react-native';

export const CustomKeyboard = ({ onKeyPress, onDelete, onAction, actionLabel = "Continue" }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity 
              key={key} 
              style={styles.key} 
              onPress={() => onKeyPress(key)}
              activeOpacity={0.6}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
          {rowIndex === 2 && (
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
    width: 800,
    alignItems: 'center',
    padding: THEME.SPACING.G16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: THEME.SPACING.G12,
    gap: THEME.SPACING.G8,
  },
  key: {
    minWidth: 70,
    height: 80,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: THEME.SPACING.RADIUS_L,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.SHADOWS.SM,
  },
  keyText: {
    fontSize: 28,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.LABEL,
  },
  specialKey: {
    backgroundColor: THEME.COLORS.SECONDARY_BACKGROUND,
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
