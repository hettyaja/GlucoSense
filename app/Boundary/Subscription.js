import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import ImageButton from '../components/ImageButton';
import { router, Stack } from 'expo-router';
import { useAuth } from '../service/AuthContext';
import setSubscribedController from '../Controller/setSubscibedController';

const Subscription = () => {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('1');
  const [price, setPrice] = useState('4.90');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({});

  const handlePlanChange = (itemValue) => {
    setSelectedPlan(itemValue);
    if (itemValue === '1') {
      setPrice('4.90');
    } else if (itemValue === '3') {
      setPrice('13.50');
    } else if (itemValue === '6') {
      setPrice('25.00');
    } else if (itemValue === '12') {
      setPrice('48.00');
    }
  };

  const validate = () => {
    const errors = {};
    if (!cardholderName) errors.cardholderName = 'Cardholder name is required';
    if (!cardNumber || cardNumber.length !== 16) errors.cardNumber = 'Card number must be 16 digits';
    if (!expiryMonth || !/^\d{2}$/.test(expiryMonth) || expiryMonth > 12) errors.expiryDate = 'Invalid expiry date';
    if (!expiryYear || !/^\d{2}$/.test(expiryYear)) errors.expiryDate = 'Invalid expiry date';
    if (!cvc || cvc.length !== 3) errors.cvc = 'CVC must be 3 digits';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async () => {
    if (validate()) {
      try {
        await setSubscribedController.setSubbed(user.uid, 'premium');
    } catch (error) {
        alert(error.message);
    }
      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString();
      Alert.alert('Payment successful');
      router.push({
        pathname: './Success',
        params: {
          referenceNumber: '000085752257', // Placeholder reference number
          date: date,
          time: time,
          paymentMethod: 'Credit Card',
          amount: (parseFloat(price) + 0.90).toFixed(2),
        },
      });
    }
  };

  return (
    <>
      <ScrollView style={styles.safeArea}>
      <Stack.Screen options={{
                title: 'Card Details',
                headerStyle: { backgroundColor: '#E58B68' },
                headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
                headerLeft: () => (
                    <ImageButton
                        source={require("../assets/back.png")}
                        imageSize={{ width: 24, height: 24 }}
                        onPress={() => router.back('/setting')}
                    />
                ),
                headerTitle: 'Card Details',
                headerTitleAlign: 'center',
            }} />
        <View style={styles.container}>
          <Text style={styles.orderDetails}>Order Details</Text>
          <Picker
            selectedValue={selectedPlan}
            style={styles.picker}
            onValueChange={(itemValue) => handlePlanChange(itemValue)}
          >
            <Picker.Item label="Premium Plan (1 Month)" value="1" />
            <Picker.Item label="Premium Plan (3 Months)" value="3" />
            <Picker.Item label="Premium Plan (6 Months)" value="6" />
            <Picker.Item label="Premium Plan (12 Months)" value="12" />
          </Picker>
          <Text style={styles.price}>S$ {price}</Text>

          <TextInput
            style={styles.input}
            placeholder="Cardholder Name"
            placeholderTextColor="#808080"
            value={cardholderName}
            onChangeText={setCardholderName}
          />
          <Text style={styles.errorText}>{errors.cardholderName || ' '}</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#808080"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <Text style={styles.errorText}>{errors.cardNumber || ' '}</Text>
          <View style={styles.row}>
            <View style={styles.leftInputs}>
              <TextInput
                style={[styles.input, styles.expiryInput]}
                placeholder="MM"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                value={expiryMonth}
                onChangeText={setExpiryMonth}
                maxLength={2}
              />
              <Text style={styles.slash}>/</Text>
              <TextInput
                style={[styles.input, styles.expiryInput]}
                placeholder="YY"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                value={expiryYear}
                onChangeText={setExpiryYear}
                maxLength={2}
              />
            </View>
            <TextInput
              style={[styles.input, styles.cvcInput]}
              placeholder="CVC"
              placeholderTextColor="#808080"
              keyboardType="numeric"
              value={cvc}
              onChangeText={setCvc}
              maxLength={3}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.errorText}>{errors.expiryDate || ' '}</Text>
            <Text style={styles.errorText}>{errors.cvc || ' '}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>S$ {price}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Tax</Text>
            <Text style={styles.summaryText}>S$ 0.90</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.totalText}>Total Payment</Text>
            <Text style={styles.totalText}>S$ {(parseFloat(price) + 0.90).toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePayment}
          >
            <Text style={styles.payButtonText}>Pay S$ {(parseFloat(price) + 0.90).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
  },
  orderDetails: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    marginBottom: 5, // Reduced marginBottom to make space for error messages
    paddingBottom: 4,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'red',
    marginBottom: 15, // Adjusted marginBottom to maintain spacing consistency
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftInputs: {
    flexDirection: 'row',
    flex: 1,
  },
  expiryInput: {
    flex: 0.3,
    textAlign: 'center',
  },
  slash: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 5,
  },
  cvcInput: {
    flex: 0.4,
    textAlign: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#D96B41',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default Subscription;
