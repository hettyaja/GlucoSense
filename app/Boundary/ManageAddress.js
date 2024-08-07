import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useCallback } from 'react'
import Header from '../components/Header'
import { router, useFocusEffect } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GetAddressController from '../Controller/GetAddressController'
import { useAuth } from '../service/AuthContext'

const ManageAddress = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)
  const [addressDetails, setAddressDetails] = useState([]);

  const fetchData = async () => {
    try {
      const details = await GetAddressController.getAddress(user.uid);
      setAddressDetails(details);
    } catch (error) {
      console.error('Error fetching address details:', error);
    } finally {
      setLoading(false)
    }
  };

  const handleEdit = (card) => {
    // Handle the edit address logic
  };

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  return (
    <>
      <Header
        title="Manage address"
        leftButton="Back"
        onLeftButtonPress={() => router.back()}
      />
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={32} color="#E68B67" />
            </View>
          ) : (
            addressDetails.map((card, index) => (
              <View key={index}>
                <TouchableOpacity style={styles.row} onPress={() => handleEdit(card)}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <MaterialCommunityIcons name='map-marker-radius-outline' size={24} color='black' style={{ paddingRight: 8 }} />
                    <View style={{ flex: 1 }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={styles.label}>{card.name} (+65 {card.phoneNumber})</Text>
                      {card.default && <Text style={styles.defaultLabel}>[DEFAULT]</Text>}
                      </View>
                      <Text style={styles.label}>{card.address}</Text>
                      
                    </View>
                  </View>
                  <Ionicons name='chevron-forward' size={24} color='black' />
                </TouchableOpacity>
                <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
              </View>
            ))
          )}
          <TouchableOpacity style={styles.row} onPress={() => router.push('Boundary/CreateAddressUI')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name='map-marker-plus-outline' size={24} color='black' style={{ paddingRight: 8 }} />
              <Text style={styles.label}>Add New Address</Text>
            </View>
            <Ionicons name='chevron-forward' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}

export default ManageAddress

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
    borderColor: '#808080'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  defaultLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color:'green',
    marginLeft:8
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
