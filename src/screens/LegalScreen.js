import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export const LegalScreen = ({ onBack }) => (
  <View style={styles.container}>
    <Text style={styles.title}>TERMS & PRIVACY</Text>
    <ScrollView style={styles.scroll}>
      <Text style={styles.text}>
        1. SwiftBox collects recipient names and phone numbers solely for delivery notification purposes.{"\n\n"}
        2. Data is encrypted and stored in a secure cloud environment.{"\n\n"}
        3. Standard SMS rates may apply for notifications.{"\n\n"}
        4. Users are responsible for closing locker doors firmly.
      </Text>
    </ScrollView>
    <TouchableOpacity onPress={onBack} style={styles.btn}>
      <Text style={styles.btnText}>I UNDERSTAND</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  scroll: { flex: 1, backgroundColor: '#F9F9F9', padding: 20, borderRadius: 10 },
  text: { fontSize: 16, lineHeight: 24, color: '#666' },
  btn: { marginVertical: 30, backgroundColor: '#002CA9', padding: 20, borderRadius: 15, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});