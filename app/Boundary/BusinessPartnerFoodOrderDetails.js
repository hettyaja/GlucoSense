import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { decode } from 'base-64';

const BusinessPartnerFoodOrderDetails = () => {
  const { orderDetails } = useLocalSearchParams();
  const order = JSON.parse(decode(orderDetails)); // Parse the order details passed as a string

  // Convert the date strings to Date objects
  const orderDate = new Date(order.orderDate);
  const deliverDate = order.deliverDate ? new Date(order.deliverDate) : null;

  return (
    <>
      <Header
        title="Food Order Details"
        leftButton="Back"
        onLeftButtonPress={() => router.back()}
      />
      <ScrollView style={styles.container}>
        {/* Menu Image */}
        <Image source={{ uri: order.menuImage }} style={styles.menuImage} />

        {/* Order Reference Number */}
        <View style={styles.section}>
          <Text style={styles.orderRef}>Order Reference: {order.orderRefNumber}</Text>
          {order.status === 'waiting' ? (
            <Text style={styles.value}>Ordered on {orderDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
          ) : (
            <Text style={styles.value}>Delivered on {deliverDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
          )}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.label}>Delivery Address</Text>
          <Text style={styles.value}>{order.deliveryAddress.name} | {order.deliveryAddress.phoneNumber}</Text>
          <Text style={styles.value}>{order.deliveryAddress.address}, {order.deliveryAddress.unit} {order.deliveryAddress.details}</Text>
          <Text style={styles.value}>{order.deliveryAddress.postCode}</Text>
        </View>

        {/* Restaurant and Menu Info */}
        <View style={styles.section}>
          <Text style={styles.restaurantName}>{order.businessPartnerName}</Text>
          <Text style={styles.menuName}>{order.quantity}x {order.menuName}</Text>
          <Text style={styles.quantity}>Notes: {order.notes ? order.notes : '-'}</Text>
        </View>

        {/* Order Date */}
        <View style={styles.section}>
          <Text style={styles.label}>Payment</Text>
          <Text style={styles.menuName}>Total: ${order.totalPayment}</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default BusinessPartnerFoodOrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  menuImage: {
    width: '100%',
    height: 250, // Adjust height as needed
  },
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  orderRef: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  restaurantName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  menuName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  quantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#808080',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#808080',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  completeOrderButton: {
    backgroundColor: '#E58B68',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    margin:16,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
