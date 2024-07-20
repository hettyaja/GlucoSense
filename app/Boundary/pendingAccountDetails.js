import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ViewPendingAccountListController from '../Controller/ViewPendingAccountListController';
import Header from '../components/Header';
import ApproveBusinessPartnerController from '../Controller/ApproveBusinessPartnerController';
import RejectBusinessPartnerController from '../Controller/RejectBusinessPartnerController';

const PendingAccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const { accountId } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const account = await ViewPendingAccountListController.getPendingAccounts();
        const selectedAccount = account.find(acc => acc.id === accountId);
        setAccountDetails(selectedAccount);
      } catch (error) {
        console.error("Error fetching account details: ", error);
      }
    };

    fetchAccountDetails();
  }, [accountId]);

  const handleAccept = async () => {
    try {
      await ApproveBusinessPartnerController.approveBusinessPartner(accountId);
      Alert.alert('Success', 'Account has been accepted and is now active.');
      router.back()
    } catch (error) {
      console.error("Error accepting account: ", error);
      Alert.alert('Error', 'Failed to accept the account.');
    }
  };

  const handleReject = async () => {
    try {
      await RejectBusinessPartnerController.rejectBusinessPartner(accountId);
      Alert.alert('Success', 'Account has been rejected.');
      router.back()
    } catch (error) {
      console.error("Error rejecting account: ", error);
      Alert.alert('Error', 'Failed to reject the account.');
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
    <>
    <Header
      title='Details'
      leftButton='Back'
      onLeftButtonPress={() => router.back()}
    />
    <View style={styles.container}>
      <Text style={styles.detailText}>Username: {accountDetails.name}</Text>
      <Text style={styles.detailText}>Registered: {new Date(accountDetails.registerTime.seconds * 1000).toLocaleDateString()}</Text>
      <Text style={styles.detailText}>Status: {accountDetails.status}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Reject" onPress={handleReject} color="red" />
        <Button title="Accept" onPress={handleAccept} color="green" />
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default PendingAccountDetails;
