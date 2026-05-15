import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

export const HelpScreen = ({ onBack }) => (
  <View style={styles.container}>
    <Text style={styles.title}>NEED HELP?</Text>
    <View style={styles.card}>
      <Text style={styles.infoTitle}>Technical Support</Text>
      <Text style={styles.infoText}>Call: +63 9XX XXX XXXX</Text>
      <Text style={styles.infoText}>Email: support@swiftbox.ph</Text>
    </View>
    <TouchableOpacity style={styles.backBtn} onPress={onBack}>
      <Text style={styles.backText}>RETURN TO MENU</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: THEME.COLORS.PRIMARY, marginBottom: 40 },
  card: { backgroundColor: '#F2F2F2', padding: 30, borderRadius: 20 },
  infoTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  infoText: { fontSize: 18, color: '#444', marginBottom: 5 },
  backBtn: { marginTop: 50, backgroundColor: THEME.COLORS.PRIMARY, padding: 20, borderRadius: 15, alignItems: 'center' },
  backText: { color: '#FFF', fontWeight: 'bold' }
});