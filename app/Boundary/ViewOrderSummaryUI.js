import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Header from '../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../service/AuthContext';
import GetAddressController from '../Controller/GetAddressController';
import CreateOrderController from '../Controller/CreateOrderController';
import { decode as atob } from 'base-64';
import GetPaymentDetailsController from '../Controller/GetPaymentDetailsController';

const ViewOrderSummaryUI = () => {
  const { menuData } = useLocalSearchParams();
  const [parsedMenuData, setParsedMenuData] = useState(menuData ? JSON.parse(atob(menuData)) : null);
  const [address, setAddress] = useState();
  const [payment, setPayment] = useState();
  const { user } = useAuth();
  const [totalPayment, setTotalPayment] = useState(0);
  const [gstFee, setGstFee] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchAddresses();
    fetchPayment();
    calculateTotalPayment();
  }, []);

  const fetchAddresses = async () => {
    try {
      const fetchedAddresses = await GetAddressController.getDefaultAddress(user.uid);
      setAddress(fetchedAddresses);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  const fetchPayment = async () => {
    try {
      const fetchedPayment = await GetPaymentDetailsController.getDefaultPaymentDetails(user.uid);
      setPayment(fetchedPayment);
    } catch (error) {
      console.error('Failed to fetch payment:', error);
    }
  };

  const calculateTotalPayment = () => {
    const subtotal = parsedMenuData.price * parsedMenuData.quantity;
    const gstFee = subtotal * 0.09; // GST fee is 9% of the subtotal
    const deliveryFee = 5;
    const total = subtotal + gstFee + deliveryFee;
    setTotalPayment(total);
    setGstFee(gstFee);
  };

  const generateOrderRefNumber = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const randomNum = String(Math.floor(10000 + Math.random() * 90000)).padStart(5, '0');
    return `#${day}${month}${year}${randomNum}`;
  };

  const handleOrder = async () => {
    const orderRefNumber = generateOrderRefNumber();
    const orderData = {
      userId: user.uid,
      businessPartnerId: parsedMenuData.bpId,
      menuId: parsedMenuData.id,
      quantity: parsedMenuData.quantity,
      notes,
      deliveryAddress: address,
      orderRefNumber, // Add the order reference number here
      totalPayment, // Add the total payment here
      status: 'waiting'
    };
    await CreateOrderController.createOrder(orderData);
    router.push('Boundary/OrderHistory');
  };

  return (
    <>
      <Header
        title="Order Summary"
        leftButton="Back"
        onLeftButtonPress={() => router.back('Boundary/MenuDetailsUI')}
      />

      <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
        {/* Address Part */}
        <View style={styles.container1}>
          {address ? (
            <TouchableOpacity style={styles.addressBox} onPress={() => router.push('Boundary/ViewAddress')}>
              <View style={styles.topRow}>
                <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{address.name} | {address.phoneNumber}</Text>
                <EvilIcons name="chevron-right" size={24} color="gray" />
              </View>
              <View style={styles.addressDetails}>
                <Text style={{ fontFamily: 'Poppins-Medium' }}>{address.address} {address.unit} {address.details}</Text>
                <Text style={{ fontFamily: 'Poppins-Medium' }}>{address.postCode}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={() => router.push('Boundary/CreateAddressUI')}
            >
              <AntDesign name="plus" size={20} />
              <Text style={styles.textAddress}>Add delivery address</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Menu Details Part */}
        <View style={styles.container3}>
          <Text>{parsedMenuData.entityName}</Text>
          <View style={styles.box}>
            <Image source={{ uri: parsedMenuData.image }} style={styles.orderImage} />
            <View>
              <Text style={styles.commonText}>{parsedMenuData.foodName}</Text>
              <Text style={styles.commonText}>${parsedMenuData.price}</Text>
            </View>
          </View>
          <Text style={styles.notesStyle}>Notes:</Text>
          <TextInput
            style={[styles.commonText, { flex: 1 }]}
            placeholder="Enter your notes here"
            placeholderTextColor="#999"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Payment Method Part */}
        <View style={styles.container3}>
          <Text style={styles.header}>Payment Method</Text>
          {payment ? (
            <TouchableOpacity style={styles.paymentBox} onPress={() => router.push('Boundary/ViewPaymentMethods')}>
              <View style={styles.topRow}>
                <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{payment.cardHolderName}</Text>
                <EvilIcons name="chevron-right" size={24} color="gray" />
              </View>
              <Text style={{ fontFamily: 'Poppins-Medium' }}>{payment.cardNumber}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addPaymentButton}
              onPress={() => router.push('Boundary/AddPaymentMethod')}
            >
              <AntDesign name="plus" size={20} />
              <Text style={styles.textPayment}>Add payment method</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Order Summary Part */}
        <View style={styles.container3}>
          <Text style={styles.header}>Order Summary</Text>
          <View style={styles.orderItem}>
            <Text>Subtotal</Text>
            <Text>${parsedMenuData.price * parsedMenuData.quantity}</Text>
          </View>
          <View style={styles.orderItem}>
            <Text>Delivery fee</Text>
            <Text>$5</Text>
          </View>
          <View style={styles.orderItem}>
            <Text>GST fee</Text>
            <Text>${gstFee.toFixed(2)}</Text>
          </View>
          <View style={styles.orderItem}>
            <Text>Total Payment</Text>
            <Text>${totalPayment.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.container5, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        <View>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, marginRight: 5 }}>Total Payment</Text>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, alignSelf: 'flex-end', marginRight: 5 }}>${totalPayment.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={handleOrder}>
          <View style={{ backgroundColor: "#D96B41", width: 120, height: 47, justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, fontFamily: "Poppins-Bold", textAlign: 'center', color: '#FAF5E1' }}>Place Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
  },
  addAddressButton: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPaymentButton: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderBox: {
    paddingHorizontal: 8,
  },
  textAddress: {
    padding: 8,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 14,
  },
  textPayment: {
    padding: 8,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 14,
  },
  smallText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  commonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  container1: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  container3: {
    marginVertical: 8,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  container5: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 47,
  },
  addressItem: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4, // Space between the top row and address details
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    marginTop: 8,
  },
  notesStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingTop: 8,
  },
  header: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ViewOrderSummaryUI;
