import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { images } from '../constants/images';
import ImageButton from '../components/ImageButton'

const Login = () => {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button pressed');
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white", alignItems:"center"}}>
      <View style={{backgroundColor:"white", alignItems:'flex-start', width:"100%", paddingHorizontal:20}}>
        <ImageButton
          source={require("../assets/back(2).png")}
          onPress={() => router.push('/welcomePage')}
        />
      </View>

      <Image source={images.logo} style={{marginBottom:60}}/>

      <View style={{backgroundColor:"white", alignItems:'flex-start', width:"100%", paddingHorizontal:50}}>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14}}>Username</Text>
      </View>
      
      <TextInput style={[styles.input, {color: "black"}]} placeholder="Enter your username" placeholderTextColor="black" />
      
      <View style={{backgroundColor:"white", flexDirection: 'row', justifyContent:"space-between", width:'100%', paddingHorizontal:50}}>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14}}>Password</Text>
      </View>

      <TextInput style={[styles.input, {color: "black"}]} placeholder="Enter your password" placeholderTextColor="black" />
      
      <View style={{backgroundColor:"white", flexDirection: 'row-reverse', justifyContent:"space-between", width:'100%', paddingHorizontal:50}}>
        <Link style={{ fontFamily: "Poppins-Medium", fontSize: 12}} href="/login1">Forgot Password?</Link>
      </View>

      <TouchableOpacity onPress={handleLogin} style={{paddingTop:90, paddingVertical:30}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
      

      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12}}>Don't have an account?</Text>
      <Link style={{ fontFamily: "Poppins-Medium", fontSize: 12, color: "#0044CC"}} href="/login1">Sign Up</Link>

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
