import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, Stack } from 'expo-router';
import { images } from '../../constants/images';
import ImageButton from '../../components/ImageButton';
import LoginController from '../../Controller/LoginController';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await LoginController.login(email, password);
    } catch (error) {
      // Show alert and stay on the login page
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingHorizontal:16}}>
        <View style={{alignItems: 'flex-start', width: '100%'}}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={32} color='black' />
          </TouchableOpacity>
        </View>

        <Image source={images.logo} style={{width:200, height:200, marginTop: 70}}/>
        <Text style={styles.titleText}>GlucoSense</Text>

        <View style={{ backgroundColor: 'white', alignItems: 'flex-start', width: '80%',marginTop: 10}}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>Email</Text>
        </View>

        <TextInput
          style={[styles.input, { color: 'black' }]}
          placeholder="Enter your email"
          placeholderTextColor="#808080"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>Password</Text>
        </View>

        <TextInput
          style={[styles.input, { color: 'black' }]}
          placeholder="Enter your password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        <View style={{ backgroundColor: 'white', flexDirection: 'row-reverse', justifyContent: 'space-between', width: '80%'}}>
          <TouchableOpacity onPress={() => router.push('Boundary/resetPwd1')}>
            <Text style={{ alignItems: 'center', fontFamily: 'Poppins-Medium', fontSize: 12, paddingBottom: 35, color: 'black', justifyContent: 'center', textAlign: 'center' }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12 }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('Boundary/preReg')}>
          <Text style={{ alignItems: 'center', fontFamily: 'Poppins-Medium', fontSize: 12, paddingBottom: 35, color: '#0044CC', justifyContent: 'center', textAlign: 'center' }}> Sign Up </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Poppins-Black",
    fontSize: 48,
    color: "#E58B68",
    // paddingBottom:60
  },
  input: {
    height: 40,
    width: '80%',
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#D96B41',
    width: '50%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center', // Vertically center content
    alignItems: 'center', // Horizontally center content,
    marginVertical:24
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textTransform: 'none', // Set text to lowercase
  },
});

export default Login;
