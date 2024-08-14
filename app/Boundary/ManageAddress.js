import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GetAddressController from '../Controller/GetAddressController';
import { useAuth } from '../service/AuthContext';
import { usePaymentAndAddress } from '../context/PaymentAndAddressContext'; // Import the context
import RadioButton from '../components/RadioButton'; 

const ManageAddress = () => {
  const { user } = useAuth();
  const { selectMode } = useLocalSearchParams();
  const { selectedAddress, setSelectedAddress } = usePaymentAndAddress(); // Use context
  const [loading, setLoading] = useState(true);
  const [addressDetails, setAddressDetails] = useState([]);

  const fetchData = async () => {
    try {
      const details = await GetAddressController.getAddress(user.uid);
      setAddressDetails(details);
      if (selectMode) {
        const defaultAddress = details.find(address => address.default);
        setSelectedAddress(defaultAddress || details[0]);
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <>
      <Header
        title="Manage Address"
        leftButton="Back"
        onLeftButtonPress={handleBackPress}
      />
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={32} color="#E68B67" />
            </View>
          ) : (
            addressDetails.map((address, index) => (
              <View key={index}>
                <TouchableOpacity 
                  style={styles.row} 
                  onPress={() => selectMode ? handleSelectAddress(address) : handleEdit(address)}
                >
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <MaterialCommunityIcons name='map-marker-radius-outline' size={24} color='black' style={{ paddingRight: 8 }} />
                    <View style={{ flex: 1 }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.label}>{address.name} (+65 {address.phoneNumber})</Text>
                        {address.default && !selectMode && <Text style={styles.defaultLabel}>[DEFAULT]</Text>}
                      </View>
                      <Text style={styles.label}>{address.address}</Text>
                    </View>
                  </View>
                  {selectMode ? (
                    <RadioButton selected={selectedAddress?.id === address.id} />
                  ) : (
                    <Ionicons name='chevron-forward' size={24} color='black' />
                  )}
                </TouchableOpacity>
                <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
              </View>
            ))
          )}
          {!selectMode && (
            <TouchableOpacity style={styles.row} onPress={() => router.push('Boundary/CreateAddressUI')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='map-marker-plus-outline' size={24} color='black' style={{ paddingRight: 8 }} />
                <Text style={styles.label}>Add New Address</Text>
              </View>
              <Ionicons name='chevron-forward' size={24} color='black' />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default ManageAddress;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 16,
  },
  container: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  defaultLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: 'green',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
