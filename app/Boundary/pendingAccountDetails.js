import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../../firebase'; // Import the Firestore instance
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const PendingAccountDetails = () => {
  const { id } = useLocalSearchParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const accountDoc = await getDoc(doc(db, 'pendingAccounts', id));
        if (accountDoc.exists()) {
          setAccountDetails(accountDoc.data());
        }
      } catch (error) {
        console.error("Error fetching account details: ", error);
      }
    };

    fetchAccountDetails();
  }, [id]);

  const handleReject = async () => {
    try {
      await updateDoc(doc(db, 'pendingAccounts', id), { status: 'Rejected' });
      router.back();
    } catch (error) {
      console.error("Error updating account status: ", error);
    }
  };

  const handleAccept = async () => {
    try {
      await updateDoc(doc(db, 'pendingAccounts', id), { status: 'Active' });
      router.back();
    } catch (error) {
      console.error("Error updating account status: ", error);
    }
  };

  if (!accountDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Account Details</Text>
      <View style={styles.detailsContainer}>
        <Text>{`Username: ${accountDetails.username}`}</Text>
        <Text>{`Registered: ${new Date(accountDetails.registerTime.seconds * 1000).toLocaleDateString()}`}</Text>
        <Text>{`Status: ${accountDetails.status}`}</Text>
        {/* Display other account details as needed */}
      </View>
      <View style={styles.buttonsContainer}>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 32,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  },
});

export default PendingAccountDetails;
