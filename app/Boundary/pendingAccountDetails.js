import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
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
      router.back();
    } catch (error) {
      console.error("Error accepting account: ", error);
      Alert.alert('Error', 'Failed to accept the account.');
    }
  };

  const handleReject = async () => {
    try {
      await RejectBusinessPartnerController.rejectBusinessPartner(accountId);
      Alert.alert('Success', 'Account has been rejected.');
      router.back();
    } catch (error) {
      console.error("Error rejecting account: ", error);
      Alert.alert('Error', 'Failed to reject the account.');
    }
  };

  if (!accountDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Header
        title="Details"
        leftButton="Back"
        onLeftButtonPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.detailText}><Text style={styles.headerText}>Username:</Text> {accountDetails.name}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>Registered:</Text> {new Date(accountDetails.registerTime.seconds * 1000).toLocaleDateString()}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>Status:</Text> {accountDetails.status}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>UEN:</Text> {accountDetails.UEN}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>Entity Name:</Text> {accountDetails.entityName}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>City:</Text> {accountDetails.city}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>Address:</Text> {accountDetails.address}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>Postal code:</Text> {accountDetails.postal}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>Full Name:</Text> {accountDetails.name}</Text>
          <Text style={styles.detailText}><Text style={styles.headerText}>Phone Number:</Text> {accountDetails.phoneNum}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    margin:16,
    borderRadius:8
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailText: {
    fontSize: 12,
    paddingHorizontal: 10, // Added padding around the text
    paddingVertical: 6, // Padding for vertical spacing
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
  },
  
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Even spacing between buttons
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  acceptButton: {
    backgroundColor: 'green',
  },
});

export default PendingAccountDetails;
