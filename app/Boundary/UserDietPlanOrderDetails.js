import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { decode } from 'base-64';

const UserDietPlanOrderDetails = () => {
  const { orderDetails } = useLocalSearchParams();
  const order = JSON.parse(decode(orderDetails)); // Parse the order details passed as a string

  // Convert the date strings to Date objects
  const startDate = new Date(order.startDate);
  const endDate = new Date(order.endDate);

  return (
    <>
      <Header
        title="Diet Plan Order Details"
        leftButton="Back"
        onLeftButtonPress={() => router.back()}
      />
      <ScrollView style={styles.container}>
        {/* Plan Image */}
        <Image source={{ uri: order.dietPlanImage }} style={styles.planImage} />

        {/* Order Reference Number */}
        <View style={styles.section}>
          <Text style={styles.orderRef}>Order Reference: {order.orderRefNumber}</Text>
          <Text style={styles.value}>Started on {startDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          <Text style={styles.value}>Ends on {endDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.label}>Delivery Address</Text>
          <Text style={styles.value}>{order.deliveryAddress.name} | {order.deliveryAddress.phoneNumber}</Text>
          <Text style={styles.value}>{order.deliveryAddress.address}, {order.deliveryAddress.unit} {order.deliveryAddress.details}</Text>
          <Text style={styles.value}>{order.deliveryAddress.postCode}</Text>
        </View>

        {/* Business Partner and Plan Info */}
        <View style={styles.section}>
          <Text style={styles.businessPartnerName}>{order.businessPartnerName}</Text>
          <Text style={styles.planName}>{order.quantity}x {order.dietPlanName}</Text>
          <Text style={styles.notes}>Notes: {order.notes ? order.notes : '-'}</Text>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Payment</Text>
          <Text style={styles.totalPayment}>Total: ${order.totalPayment}</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default UserDietPlanOrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  planImage: {
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
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#808080',
  },
  businessPartnerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  planName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  notes: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#808080',
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  totalPayment: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#333',
  },
});
