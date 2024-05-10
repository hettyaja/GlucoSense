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
    <>
    <View style={{backgroundColor:"white", paddingTop:60, paddingLeft:20}}>
      <Image source={images.back}/>
    </View>
    <View style={{ flex: 1, backgroundColor: "white", alignItems:"center"}}>
        <Image source={images.logo}/>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14, paddingTop: 12, paddingRight:260}}>Username</Text>
        <TextInput style={[styles.input, {color: "black"}]} placeholder="Enter your username" placeholderTextColor="black" />
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14, paddingTop: 12,}}>Password</Text>
        <TextInput style={[styles.input, {color: "black"}]} placeholder="Enter your password" placeholderTextColor="black" />
        <Link style={{ fontFamily: "Poppins-Medium", fontSize: 12, paddingTop: 12, position: "absolute", top: 536, left: 255 }} href="/login1">Forgot Password?</Link>

        <TouchableOpacity onPress={handleLogin} style={{ position: "absolute", top: 610 }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12, paddingTop: 1, position: "absolute", top: 675}}>Don't have an account?</Text>
        <Link style={{ fontFamily: "Poppins-Medium", fontSize: 12, paddingTop: 1, position: "absolute", top: 695, color: "#0044CC"}} href="/login1">Sign Up</Link>
    </View>
    </>
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
