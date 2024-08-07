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
  const orderDetails = JSON.parse(atob(menuData));
  const [address, setAddress] = useState();
  const { user } = useAuth();
  const [totalPayment, setTotalPayment] = useState(0);
  const [payment, setPayment] = useState();
  console.log(payment)

  useEffect(() => {
    fetchAddresses();
    calculateTotalPayment();
    fetchPayment()
  }, [address, orderDetails]);

  const fetchAddresses = async () => {
    try {
      const fetchedAddresses = await GetAddressController.getAddress(user.uid);
      setAddress(fetchedAddresses);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  const fetchPayment = async () => {
    try{
      const fetchedPayment = await GetPaymentDetailsController.getPaymentDetails(user.uid);
      setPayment(fetchedPayment);
    }catch(error){
      console.error('Failed to fetch payment:', error);
    }
  }

  const calculateTotalPayment = () => {
    const subtotal = orderDetails.price * orderDetails.quantity;
    const deliveryFee = 5; 
    const serviceFee = 1.5; 
    const total = subtotal + deliveryFee + serviceFee;
    setTotalPayment(total);
  };

  const handleOrder = async () => {
    const orderData = {
      userId: user.uid,
      businessPartnerId: parsedMenuData.bpId,
      menuId: parsedMenuData.id,
      quantity: parsedMenuData.quantity,
      deliveryAddress: address,
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
            address.map((address, index) => (
              <TouchableOpacity key={index} style={styles.addressBox} onPress={() => router.push('Boundary/ViewAddress')}>
                <View style={styles.topRow}>
                  <Text style={styles.nameStyle}>{address.name} | {address.phoneNumber}</Text>
                  <EvilIcons name="chevron-right" size={24} color="gray" />
                </View>
                <View style={styles.addressDetails}>
                  <Text style={styles.addressStyle}>{address.address} {address.unit} {address.details}</Text>
                  <Text style={styles.addressStyle}>{address.postCode}</Text>
                </View>
              </TouchableOpacity>
            ))
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

        <View style={styles.container3}>
          <Text>{orderDetails.entityName}</Text>

          <View style={styles.box}>
            <Image source={{ uri: parsedMenuData.image }} style={styles.orderImage} />
            <View>
              <Text style={styles.commonText}>{orderDetails.foodName}</Text>
              <Text style={styles.commonText}>${orderDetails.price}</Text>
            </View>
          </View>

          <Text style={styles.notesStyle}>Notes:</Text>
          <TextInput
            style={[styles.commonText, { flex: 1 }]}
            placeholder="Enter your notes here"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.container3}>
          <Text style={styles.header}>Order Summary</Text>

          <View style={styles.orderItem}>
            <Text>Subtotal</Text>
            <Text>${orderDetails.price * orderDetails.quantity}</Text>
          </View>

          <View style={styles.orderItem}>
            <Text>Delivery fee</Text>
            <Text>$5</Text>
          </View>

          <View style={styles.orderItem}>
            <Text>Service fee</Text>
            <Text>$2</Text>
          </View>

          <View style={styles.orderItem}>
            <Text>Total Payment</Text>
            <Text>${totalPayment}</Text>
          </View>

        </View>
      </ScrollView>

      <View style={[styles.container5, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        <View>
          <Text style={styles.orderItem}>Total Payment</Text>
          <Text style={styles.orderItem}>${totalPayment}</Text>
        </View>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => handleOrder()}>
          <View style={{ backgroundColor: "#D96B41", width: 120, height: 47, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: "Poppins-Bold", textAlign: 'center', color: '#FAF5E1' }}>Place Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addressStyle:{
    fontFamily: 'Poppins-Regular'
  },
  nameStyle:{
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 16
  },
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
  orderBox: {
    paddingHorizontal: 8,
  },
  textAddress: {
    padding: 8,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 16,
  },
  commonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  container1: {
    backgroundColor: 'white',
    // paddingVertical: 8,
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
    fontSize: 14,
    paddingTop: 8,
  },
  header: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ViewOrderSummaryUI;
