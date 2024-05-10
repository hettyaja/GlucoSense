import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { images } from '../constants/images';

const Login = () => {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button pressed');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
        <Image source={images.back} style={{position:"absolute", left:24, top:60}}/>
        <Image source={images.logo} style={{position:"absolute", top:89, left:63}}/>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14, paddingTop: 12, position: "absolute", top: 400, left: 27 }}>Username</Text>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14, paddingTop: 12, position: "absolute", top: 472, left: 27 }}>Password</Text>

        <TextInput style={[styles.input, { position: "absolute", top: 424, left: 15, color: "black"}]} placeholder="Enter your username" placeholderTextColor="black" />
        <TextInput style={[styles.input, { position: "absolute", top: 496, left: 15, color: "black"}]} placeholder="Enter your password" placeholderTextColor="black" />
        <Link style={{ fontFamily: "Poppins-Medium", fontSize: 12, paddingTop: 12, position: "absolute", top: 536, left: 255 }} href="/login1">Forgot Password?</Link>

        <TouchableOpacity onPress={handleLogin} style={{ position: "absolute", top: 610 }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12, paddingTop: 1, position: "absolute", top: 675}}>Don't have an account?</Text>
        <Link style={{ fontFamily: "Poppins-Medium", fontSize: 12, paddingTop: 1, position: "absolute", top: 695, color: "#0044CC"}} href="/login1">Sign Up</Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 36,
    width: 336,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    opacity: 0.5,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#D96B41",
    width: 164,
    height: 42,
    borderRadius: 8,
    justifyContent: "center", // Vertically center content
    alignItems: "center", // Horizontally center content
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textTransform: "none", // Set text to lowercase
  },
});

export default Login;
