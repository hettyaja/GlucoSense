import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MenuDetailsController from '../Controller/MenuDetailsController';
import UpdateFoodOrderController from '../Controller/UpdateFoodOrderController';
import { useAuth } from '../service/AuthContext';
import { encode } from 'base-64'
import { router } from 'expo-router';

const FoodCard = ({ item, onOrderDelivered }) => {
  const { user } = useAuth(); // Use the auth context to get the user

  const handleDeliver = async () => {
    try {
      await UpdateFoodOrderController.updateFoodOrder(item.orderId, { deliverDate: new Date(), status: 'complete' }); // Update the order status to 'complete'
      onOrderDelivered();
      console.log('Order status updated to complete');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: 'Boundary/BusinessPartnerFoodOrderDetails',
          params: { orderDetails: encode(JSON.stringify(item)) },
        })
      }
    >
      <Image source={{ uri: item.menuImage }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Order {item.orderRefNumber}</Text>
        <View style={{ borderBottomWidth: 0.5, borderColor: '#808080' }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.cardSubtitle}>{item.menuName}</Text>
          <Text style={styles.cardSubtitle}>Qty: {item.quantity}</Text>
        </View>
        <Text style={styles.cardLabel}>Notes: {item.notes ? item.notes : '-'}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.cardSubtitle]}>$ {item.totalPayment.toFixed(2)}</Text>
          {/* Conditionally render the "Deliver" button if status is not 'complete' */}
          {item.status !== 'complete' && (
            <TouchableOpacity style={styles.deliverButton} onPress={handleDeliver}>
              <Text style={styles.deliverText}>Deliver</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DietPlanCard = ({ item }) => (
  <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: 'Boundary/BusinessPartnerDietPlanOrderDetails', params: { orderDetails: encode(JSON.stringify(item)) } })}>
    <Image source={{ uri: item.dietPlanImage }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>Order {item.orderRefNumber}</Text>
      <View style={{ borderBottomWidth: 0.5, borderColor: '#808080' }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.cardSubtitle}>{item.dietPlanName} ({item.quantity} Week)</Text>
        <Text style={styles.cardSubtitle}>${item.totalPayment}</Text>
      </View>
      <Text style={styles.cardLabel}>Notes: {item.notes ? item.notes : '-'}</Text>
      <Text style={styles.cardLabel}>Start: {new Date(item.startDate).toLocaleDateString()}</Text>
      <Text style={styles.cardLabel}>End: {new Date(item.endDate).toLocaleDateString()}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: 128,
    height: 128,
  },
  cardContent: {
    flex: 1,
    padding: 8,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'red',
    padding: 16,
  },
  deliverButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth:1,
    borderColor:'#E58B68'
  },
  deliverText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#E58B68',
  },
});


export { FoodCard, DietPlanCard };
