import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { THEME } from '../constants/theme';

export const ReturnScreen = ({ onConfirm, onBack }) => {
  const [returnId, setReturnId] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INITIATE RETURN</Text>
      <Text style={styles.subtitle}>Enter the Return Authorization Code provided by your merchant.</Text>
      
      <TextInput
        style={styles.input}
        placeholder="RET-XXXX-XXXX"
        value={returnId}
        onChangeText={setReturnId}
        autoFocus={true}
      />

      <TouchableOpacity 
        style={[styles.confirmBtn, { opacity: returnId.length > 5 ? 1 : 0.5 }]} 
        onPress={() => onConfirm(returnId)}
        disabled={returnId.length <= 5}
      >
        <Text style={styles.confirmText}>VALIDATE RETURN CODE</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>Back to Main Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: THEME.COLORS.PRIMARY },
  subtitle: { fontSize: 18, color: '#666', marginVertical: 20 },
  input: { height: 80, backgroundColor: '#F2F2F2', borderRadius: 15, paddingHorizontal: 20, fontSize: 24, marginBottom: 30 },
  confirmBtn: { backgroundColor: THEME.COLORS.PRIMARY, padding: 25, borderRadius: 15, alignItems: 'center' },
  confirmText: { color: '#FFF', fontWeight: 'bold', fontSize: 20 },
  backBtn: { marginTop: 30, alignSelf: 'center' },
  backText: { color: '#888', textDecorationLine: 'underline' }
});