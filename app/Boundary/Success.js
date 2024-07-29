import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import ImageButton from '../components/ImageButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { referenceNumber, date, time, paymentMethod, amount } = route.params;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Payment Successful',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <ImageButton
            source={require("../assets/back.png")}
            imageSize={{ width: 24, height: 24 }}
            onPress={() => navigation.navigate('Subscription')}
          />
        ),
        headerTitleAlign: 'center',
      }} />
      <View style={styles.successMessageContainer}>
        <Text style={styles.successMessage}>Thank you for your payment!</Text>
        <Text style={styles.successMessage}>Your subscription has been activated.</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Reference Number:</Text>
        <Text style={styles.value}>{referenceNumber}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{time}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Payment Method:</Text>
        <Text style={styles.value}>{paymentMethod}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>S$ {amount}</Text>
      </View>
      <TouchableOpacity
        style={styles.okButton}
        onPress={() => router.push('./home')}
      >
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  successMessageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  successMessage: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#4CAF50',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  okButton: {
    backgroundColor: '#D96B41',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 80,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default Success;
