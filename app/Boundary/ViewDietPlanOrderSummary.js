import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../service/AuthContext';
import GetAddressController from '../Controller/GetAddressController';
import GetPaymentDetailsController from '../Controller/GetPaymentDetailsController';
import CreateDietPlanOrderController from '../Controller/CreateDietPlanOrderController';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePaymentAndAddress } from '../context/PaymentAndAddressContext';

const ViewDietPlanOrderSummary = () => {
  const { orderData } = useLocalSearchParams();
  const { selectedCard, selectedAddress } = usePaymentAndAddress(); // Use context
  const [parsedOrderData, setParsedOrderData] = useState(orderData ? JSON.parse(atob(orderData)) : null);
  const [address, setAddress] = useState();
  const [payment, setPayment] = useState();
  const { user } = useAuth();
  const [totalPayment, setTotalPayment] = useState(0);
  const [gstFee, setGstFee] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedAddress) {
      setAddress(selectedAddress); // Update address if one is selected
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (selectedCard) {
      setPayment(selectedCard); // Update payment if a card is selected
    }
  }, [selectedCard]);

  const fetchAddresses = async () => {
    try {
      const fetchedAddresses = await GetAddressController.getDefaultAddress(user.uid);
      setAddress(selectedAddress || fetchedAddresses); // Use selectedAddress if available
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  const fetchPayment = async () => {
    try {
      const fetchedPayment = await GetPaymentDetailsController.getDefaultPaymentDetails(user.uid);
      setPayment(selectedCard || fetchedPayment); // Use selectedCard if available
    } catch (error) {
      console.error('Failed to fetch payment:', error);
    }
  };

  const calculateTotalPayment = () => {
    const subtotal = parsedOrderData.price * parsedOrderData.quantity;
    const gstFee = subtotal * 0.09; // GST fee is 9% of the subtotal
    const deliveryFee = 5;
    const total = subtotal + gstFee + deliveryFee;
    setTotalPayment(total);
    setGstFee(gstFee);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
      fetchPayment();
      calculateTotalPayment();
    }, [selectedAddress, selectedCard])
  );

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

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (parsedOrderData.quantity * 7) - 1);

    const orderData = {
      orderRefNumber,
      userId: user.uid,
      businessPartnerId: parsedOrderData.bpId,
      dietPlanId: parsedOrderData.dietPlanId,
      deliveryAddress: address,
      totalPayment,
      quantity: parsedOrderData.quantity,
      startDate,
      endDate,
      notes,
    };
    await CreateDietPlanOrderController.createDietPlanOrder(orderData);
        // Show success alert
    Alert.alert(
      "Order Placed",
      "Your order has been successfully placed!",
      [
        {
          text: "OK",
          onPress: () => router.push('Boundary/food'), // Navigate to order history
        }
      ]
    );
  };

  return (
    <>
      <Header
        title="Order Summary"
        leftButton="Back"
        onLeftButtonPress={() => router.back()}
      />

      <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
        {/* Address Part */}
        <View style={styles.container1}>
          {address ? (
            <TouchableOpacity style={styles.addressBox} onPress={() => router.push({ pathname: 'Boundary/ManageAddress', params: { selectMode: true } })}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name='map-marker-radius-outline' size={24} color='black' style={{ paddingRight: 8 }} />
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:14}}>Delivery Address</Text>
                  </View>
                  <Text style={{ fontFamily: 'Poppins-Medium' }}>{address.name} | {address.phoneNumber}</Text>
                  <Text style={{ fontFamily: 'Poppins-Regular' }}>{address.address}, {address.unit} {address.details}</Text>
                  <Text style={{ fontFamily: 'Poppins-Regular' }}>{address.postCode}</Text>
                </View>
                <Ionicons name='chevron-forward' size={24} color='grey' />
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
          <Text style={{fontFamily:'Poppins-SemiBold'}}>{parsedOrderData.entityName}</Text>
          <View style={styles.box}>
            <View style={{flex:1, flexDirection:'row'}}>
              <Image source={{ uri: parsedOrderData.planImage }} style={styles.orderImage} />
              <View style={{flex: 1,justifyContent:'space-between'}}>
                <Text style={styles.commonText}>{parsedOrderData.planName}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.commonText}>${parsedOrderData.price}</Text>
                  <Text style={styles.commonText}>x{parsedOrderData.quantity}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{borderTopWidth:0.5, borderColor:'#808080'}}/>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingTop:8}}>
            <Text style={styles.notesStyle}>Notes:</Text>
            <TextInput
              style={[styles.commonText, {textAlign:'right', width:200}]}
              placeholder="Enter your notes here"
              placeholderTextColor="#999"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        {/* Payment Method Part */}
        <View style={styles.container3}>
          <Text style={styles.header}>Payment Method</Text>
          {payment ? (
            <>
            <TouchableOpacity style={styles.paymentBox} onPress={() => router.push({ pathname: 'Boundary/PaymentMethod', params: { selectMode: true } })}>
              <Text style={{ fontFamily: 'Poppins-Regular' }}>Visa (**** **** **** {payment.cardNumber.slice(-4)})</Text>
              <Ionicons name='chevron-forward' size={24} color='grey' />
            </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.addPaymentButton}
              onPress={() => router.push('Boundary/CardDetails')}
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
            <Text>${parsedOrderData.price * parsedOrderData.quantity}</Text>
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

      <View style={styles.footerContainer}>
        <View style={styles.totalPaymentContainer}>
          <Text style={styles.totalPaymentLabel}>Total Payment: </Text>
          <Text style={styles.totalPaymentAmount}>${totalPayment.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handleOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ViewDietPlanOrderSummary;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  container3: {
    marginVertical: 8,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  totalPaymentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 16,
  },
  totalPaymentLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  totalPaymentAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  placeOrderButton: {
    backgroundColor: '#D96B41',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#FAF5E1',
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
  textAddress: {
    padding: 8,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 14,
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
  textPayment: {
    padding: 8,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 14,
  },
  box: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  orderBox: {
    paddingHorizontal: 8,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  commonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  smallText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  notesStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  header: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
});
