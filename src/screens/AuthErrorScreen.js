import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

export const AuthErrorScreen = ({ onRetry, onCancel }) => (
  <View style={styles.container}>
    <Text style={styles.title}>ACCESS DENIED</Text>
    <Text style={styles.subtitle}>The code or ID provided is invalid or has already been used.</Text>
    
    <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
      <Text style={styles.retryText}>TRY AGAIN</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onCancel} style={styles.cancelLink}>
      <Text style={styles.cancelText}>Cancel and Exit</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40, justifyContent: 'center' },
  title: { fontSize: 32, color: THEME.COLORS.DANGER, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 40 },
  retryBtn: { backgroundColor: THEME.COLORS.PRIMARY, padding: 25, borderRadius: 15, alignItems: 'center' },
  retryText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  cancelLink: { marginTop: 30, alignSelf: 'center' },
  cancelText: { color: '#888', textDecorationLine: 'underline' }
});