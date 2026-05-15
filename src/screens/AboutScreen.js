import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const AboutScreen = ({ onBack }) => (
  <View style={styles.container}>
    <Text style={styles.title}>ABOUT SWIFTBOX</Text>
    <Text style={styles.version}>Version 1.0.0 (Research Prototype)</Text>
    
    <View style={styles.devCard}>
      <Text style={styles.devLabel}>Developed by:</Text>
      <Text style={styles.devName}>Renz and Team</Text>
      <Text style={styles.devSub}>Smart Logistics Research Project 2026</Text>
    </View>

    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
      <Text style={styles.backText}>BACK</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#002CA9' },
  version: { color: '#888', marginBottom: 40 },
  devCard: { backgroundColor: '#F8F9FA', padding: 30, borderRadius: 20, borderLeftWidth: 5, borderLeftColor: '#C1F701' },
  devLabel: { fontSize: 14, color: '#888' },
  devName: { fontSize: 24, fontWeight: 'bold', marginVertical: 5 },
  devSub: { fontSize: 16, color: '#666' },
  backBtn: { marginTop: 40, alignSelf: 'center' },
  backText: { color: '#002CA9', fontWeight: 'bold', textDecorationLine: 'underline' }
});