import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { SwiftVoice } from '../services/voiceService';

export const AdminLoginScreen = ({ onLogin, onCancel }) => {
  const [pin, setPin] = useState('');
  const MASTER_PIN = "9999"; // Temporary bone PIN

  const handlePress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === MASTER_PIN) {
        SwiftVoice.say("Access granted. Welcome, Admin.");
        onLogin();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADMIN ACCESS</Text>
      <View style={styles.dotsRow}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={[styles.dot, pin.length > i && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <TouchableOpacity key={num} style={styles.key} onPress={() => handlePress(num.toString())}>
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={onCancel} style={styles.cancel}>
        <Text style={styles.cancelText}>Exit Admin Mode</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center' },
  title: { color: '#FFF', fontSize: 24, fontFamily: THEME.FONTS.FAMILY_BOLD, marginBottom: 30 },
  dotsRow: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#FFF', marginHorizontal: 10 },
  dotActive: { backgroundColor: THEME.COLORS.SUCCESS },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: 300, justifyContent: 'center' },
  key: { width: 80, height: 80, margin: 10, borderRadius: 40, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  keyText: { color: '#FFF', fontSize: 28, fontFamily: THEME.FONTS.FAMILY_BOLD },
  cancel: { marginTop: 40 },
  cancelText: { color: 'rgba(255,255,255,0.5)', textDecorationLine: 'underline' }
});