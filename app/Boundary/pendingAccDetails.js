// src/app/pendingAccountDetails.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { updateAccountStatus } from '../controllers/pendingAccountController';

const PendingAccountDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleAccept = async () => {
    await updateAccountStatus(id, 'Active');
    router.back();
  };

  const handleReject = async () => {
    await updateAccountStatus(id, 'Rejected');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Account</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailsText}>Account Details</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#D9A37E', padding: 16 },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  details: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  detailsText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  rejectButton: { backgroundColor: '#e74c3c', padding: 16, borderRadius: 8 },
  acceptButton: { backgroundColor: '#2ecc71', padding: 16, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PendingAccountDetails;
