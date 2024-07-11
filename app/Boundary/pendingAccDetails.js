import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PendingAccountDetails = () => {
  const { item } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Account</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.detailTitle}>Account Details</Text>
        {/* Display the details of the selected account */}
        <Text>Username: {item.username}</Text>
        <Text>Registered: {new Date(item.registered.seconds * 1000).toLocaleDateString()}</Text>
        <Text>Status: {item.status}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.rejectButton} onPress={() => {/* Handle reject action */}}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={() => {/* Handle accept action */}}>
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
  content: {
    padding: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PendingAccountDetails;
