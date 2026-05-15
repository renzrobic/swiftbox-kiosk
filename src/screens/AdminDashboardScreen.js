import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';

export const AdminDashboardScreen = ({ onLogout }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 40 }}>
      <Text style={styles.header}>SYSTEM HUB</Text>

      {/* HARDWARE OVERRIDE BONES */}
      <Text style={styles.sectionTitle}>LOCKER OVERRIDES</Text>
      {[1, 2, 3].map((id) => (
        <View key={id} style={styles.lockerRow}>
          <Text style={styles.lockerName}>Locker 0{id}</Text>
          <TouchableOpacity style={styles.unlockBtn}>
            <Text style={styles.unlockText}>FORCE UNLOCK</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* SYSTEM SETTINGS BONES */}
      <Text style={styles.sectionTitle}>ACCESSIBILITY SETTINGS</Text>
      <TouchableOpacity style={styles.settingBtn}>
        <Text style={styles.settingText}>VOICE OVER: ON</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingBtn}>
        <Text style={styles.settingText}>HIGH CONTRAST: ON</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>CLOSE DASHBOARD</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { fontSize: 32, fontFamily: THEME.FONTS.FAMILY_BOLD, color: THEME.COLORS.PRIMARY, marginBottom: 40 },
  sectionTitle: { fontSize: 18, fontFamily: THEME.FONTS.FAMILY_BOLD, color: '#888', marginBottom: 20, marginTop: 10 },
  lockerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  lockerName: { fontSize: 20, fontFamily: THEME.FONTS.FAMILY_BOLD },
  unlockBtn: { backgroundColor: THEME.COLORS.DANGER, padding: 10, borderRadius: 10 },
  unlockText: { color: '#FFF', fontWeight: 'bold' },
  settingBtn: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  settingText: { fontSize: 18, fontFamily: THEME.FONTS.FAMILY_SEMIBOLD },
  logoutBtn: { marginTop: 40, backgroundColor: THEME.COLORS.PRIMARY, padding: 20, borderRadius: 15, alignItems: 'center' },
  logoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});