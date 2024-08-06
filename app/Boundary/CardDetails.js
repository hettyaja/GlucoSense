import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../service/AuthContext'
import Header from '../components/Header'
import { router } from 'expo-router'
import CreatePaymentDetailsController from '../Controller/CreatePaymentDetailsController'

const CardDetails = () => {
  const { user } = useAuth()
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({});
  
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

  const handleSave = async () => {
    if(validate()) {
      const cardDetails = {
        cardholderName,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvc
      }

      await CreatePaymentDetailsController.createPaymentDetails(user.uid, cardDetails)
      router.replace('Boundary/PaymentMethod')
    }
  }

  return (
    <>
      <Header
        title='Add Card'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Card Details</Text>
          <TextInput
            placeholder='Cardholder Name'
            placeholderTextColor='#808080'
            style={styles.input}
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
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Submit</Text>
          </TouchableOpacity>
        </View>
    </>
  )
}

export default CardDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 16,
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    paddingBottom: 24,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    marginBottom: 4,
    paddingBottom: 4,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'red',
    marginBottom: 15,
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
    flex: 0.5,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#E58B68',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'white',
  },
})
