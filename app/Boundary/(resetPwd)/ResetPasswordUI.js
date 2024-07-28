import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import Header from '../../components/Header';
import ResetPasswordController from '../../Controller/ResetPasswordController';

const ResetPasswordUI = () => {
  const [email, setEmail] = useState('');

  const handleButtonPress = () => {
    if (email.trim() !== '') {
      ResetPasswordController.resetPassword(email);
      Alert.alert('Reset Password', 'Reset password link has been sent to your email.')
      router.replace('Boundary/LoginUI');
    } else {
      Alert.alert('Empty Field', 'Please enter your email.')
    }

  };

  return (
    <>
      <Header
        title="Reset Password"
        leftButton="Back"
        onLeftButtonPress={() => router.back('Boundary/loginPage')}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Email address here</Text>
        <Text style={styles.subtitle}>
          Please enter your email address associated with your account.
        </Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder='Enter your email'
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#808080',
    marginTop: 8,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: '#E58B68',
    width:'50%',
    height: 40,
    borderRadius: 8,
    alignSelf:'center',
    justifyContent:'center'
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});

export default ResetPasswordUI;
