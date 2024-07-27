import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, Stack } from 'expo-router';
import { images } from '../../constants/images';
import ImageButton from '../../components/ImageButton';
import LoginController from '../../Controller/LoginController';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import Header from '../../components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await LoginController.login(email, password);
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };


  return (
    <>
      <Header
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
        transparent={true}
        title=''
        leftButtonColor='black'
      />
      <ScrollView style={styles.safeArea}>
          <View style={styles.container}>

            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.titleText}>GlucoSense</Text>

            <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabel}>Email</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#808080"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType='email'
            />

            <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabel}>Password</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#808080"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={() => router.push('Boundary/ResetPasswordUI')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.signUpPrompt}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('Boundary/preReg')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop:100
  },
  backButtonContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  titleText: {
    fontFamily: "Poppins-Black",
    fontSize: 48,
    color: "#E58B68",
    paddingBottom: 60,
  },
  inputLabelContainer: {
    width: '80%',
    alignItems: 'flex-start',
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    color: 'black',
  },
  forgotPasswordContainer: {
    width: '80%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingBottom: 35,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D96B41',
    width: '50%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signUpPrompt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  signUpText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingBottom: 35,
    color: '#0044CC',
    textAlign: 'center',
  },
});

export default Login;
