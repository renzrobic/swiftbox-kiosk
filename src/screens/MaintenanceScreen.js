import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MaintenanceScreen = () => (
  <View style={styles.container}>
    <Text style={styles.emoji}>🛠️</Text>
    <Text style={styles.title}>SYSTEM UNDER MAINTENANCE</Text>
    <Text style={styles.text}>
      We are performing a scheduled update. We'll be back online shortly.
    </Text>
    <View style={styles.statusBox}>
      <Text style={styles.statusText}>MODE: OFFLINE</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center', padding: 40 },
  emoji: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  text: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10, lineHeight: 24 },
  statusBox: { marginTop: 40, padding: 10, borderBottomWidth: 2, borderBottomColor: '#002CA9' },
  statusText: { fontWeight: 'bold', letterSpacing: 2 }
});