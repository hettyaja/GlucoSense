import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ApproveBusinessPartnerController from '../../Controller/ApproveBusinessPartnerController';
import RejectBusinessPartnerController from '../../Controller/RejectBusinessPartnerController';
import ViewPendingAccountDetailsController from '../../Controller/ViewPendingAccountDetailsController';

const PendingAccountDetails = () => {
  const { accountId } = useLocalSearchParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const details = await ViewPendingAccountDetailsController.getDetails(accountId);
        setAccountDetails(details);
      } catch (error) {
        console.error("Error fetching account details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [accountId]);

  const handleAccept = async () => {
    try {
      await ApproveBusinessPartnerController.approve(accountId);
      alert('Business Partner approved successfully');
      router.back();
    } catch (error) {
      console.error("Error accepting account: ", error);
      alert('Failed to accept Business Partner');
    }
  };

  const handleReject = async () => {
    try {
      await RejectBusinessPartnerController.reject(accountId);
      alert('Business Partner rejected successfully');
      router.back();
    } catch (error) {
      console.error("Error rejecting account: ", error);
      alert('Failed to reject Business Partner');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!accountDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No Account Details Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Account</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Username: {accountDetails.name}</Text>
        <Text style={styles.detailsText}>Stall Name: {accountDetails.entityName}</Text>
        <Text style={styles.detailsText}>Registered: {new Date(accountDetails.registerTime.seconds * 1000).toLocaleDateString()}</Text>
        <Text style={styles.detailsText}>Status: {accountDetails.status}</Text>
      </View>
      <View style={styles.actionsContainer}>
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
    padding: 16,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PendingAccountDetails;
