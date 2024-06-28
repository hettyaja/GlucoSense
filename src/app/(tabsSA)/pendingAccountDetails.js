import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';

const PendingAccountDetails = () => {
  const { partner } = useSearchParams();
  const partnerData = JSON.parse(partner);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Account</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Account Details</Text>
        <Text style={styles.detailsContent}>Username: {partnerData.username}</Text>
        <Text style={styles.detailsContent}>Stall Name: {partnerData.stallName}</Text>
        <Text style={styles.detailsContent}>Registered: {new Date(partnerData.registered.seconds * 1000).toLocaleDateString()}</Text>
        <Text style={styles.detailsContent}>Status: {partnerData.status}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#D9A37E',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContent: {
    fontSize: 16,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PendingAccountDetails;
