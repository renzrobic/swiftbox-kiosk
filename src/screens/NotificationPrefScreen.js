import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

export const NotificationPrefScreen = ({ onSelect }) => {
  const [selected, setSelected] = useState('SMS');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NOTIFICATION METHOD</Text>
      <Text style={styles.subtitle}>How should we send your digital receipt?</Text>

      {['SMS ONLY', 'EMAIL ONLY', 'BOTH SMS & EMAIL'].map((option) => (
        <TouchableOpacity 
          key={option} 
          style={[styles.optionCard, selected === option && styles.selectedCard]}
          onPress={() => setSelected(option)}
        >
          <Text style={[styles.optionText, selected === option && styles.selectedText]}>{option}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity 
        style={styles.saveBtn} 
        onPress={() => onSelect(selected)}
      >
        <Text style={styles.saveText}>SAVE & CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: THEME.COLORS.PRIMARY, marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 40 },
  optionCard: { padding: 30, borderWidth: 2, borderColor: '#EEE', borderRadius: 20, marginBottom: 15 },
  selectedCard: { borderColor: THEME.COLORS.SUCCESS, backgroundColor: '#F0FFF0' },
  optionText: { fontSize: 20, fontWeight: '600', color: '#444' },
  selectedText: { color: THEME.COLORS.PRIMARY },
  saveBtn: { marginTop: 30, backgroundColor: THEME.COLORS.PRIMARY, padding: 25, borderRadius: 15, alignItems: 'center' },
  saveText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});