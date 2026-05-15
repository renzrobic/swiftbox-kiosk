import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

export const LockerFullScreen = ({ onBack }) => (
  <View style={styles.container}>
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>!</Text>
    </View>
    <Text style={styles.title}>LOCKER FULL</Text>
    <Text style={styles.message}>
      We're sorry, but all available lockers are currently occupied. Please try again later or contact support.
    </Text>
    <TouchableOpacity style={styles.btn} onPress={onBack}>
      <Text style={styles.btnText}>RETURN TO HOME</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40, justifyContent: 'center', alignItems: 'center' },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: THEME.COLORS.DANGER, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  iconText: { color: '#FFF', fontSize: 60, fontWeight: 'bold' },
  title: { fontSize: 32, fontFamily: THEME.FONTS.FAMILY_BOLD, color: THEME.COLORS.PRIMARY, marginBottom: 20 },
  message: { fontSize: 18, color: '#666', textAlign: 'center', lineHeight: 26, marginBottom: 40 },
  btn: { backgroundColor: THEME.COLORS.PRIMARY, paddingVertical: 20, paddingHorizontal: 60, borderRadius: 15 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});