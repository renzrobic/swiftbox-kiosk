import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

export const RiderInfoScreen = ({ onNext, onCancel }) => {
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECIPIENT DETAILS</Text>
      <Text style={styles.label}>Enter Customer Phone Number:</Text>
      
      <TextInput
        style={styles.input}
        placeholder="09XX-XXX-XXXX"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        maxLength={11}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onCancel}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.nextBtn, { opacity: phone.length >= 11 ? 1 : 0.5 }]} 
          onPress={() => onNext(phone)}
          disabled={phone.length < 11}
        >
          <Text style={styles.nextText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40, justifyContent: 'center' },
  title: { fontSize: 32, fontFamily: THEME.FONTS.FAMILY_BOLD, color: THEME.COLORS.PRIMARY, marginBottom: 40 },
  label: { fontSize: 18, color: '#666', marginBottom: 10 },
  input: {
    height: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    paddingHorizontal: 25,
    fontSize: 32,
    fontFamily: THEME.FONTS.FAMILY_BOLD,
    color: THEME.COLORS.PRIMARY,
    marginBottom: 40,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  backBtn: { padding: 25 },
  backText: { fontSize: 18, color: '#888', textDecorationLine: 'underline' },
  nextBtn: { backgroundColor: THEME.COLORS.PRIMARY, paddingVertical: 25, paddingHorizontal: 50, borderRadius: 15 },
  nextText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' }
});