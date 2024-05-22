import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';

const preReg = () => {
  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{backgroundColor:"#E58B68"}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center', marginBottom: 10}}>Reset Password</Text>
        </View>
      </View>
      <Text style = {{fontFamily: 'Poppins-Bold', fontSize: 20, marginLeft: 30, marginTop: 35}}>Email address here</Text>
      <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 30, marginRight: 100, color: '#808080'}}>Please enter your email address associated with your account.</Text>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14,marginLeft: 30, marginTop: 15}}>Email</Text>
      <TextInput style={[styles.input, {color: "black", marginLeft: 30}]}/>
      <TouchableOpacity style={{ alignItems: 'center', marginTop: 125 }} onPress = {() => router.push('login/reset2')}>
        <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Send</Text>
      </View>
      </TouchableOpacity>
    </View>
    
  )
}
const styles = StyleSheet.create({
  input: {
  height: 36,
  width: 336,
  borderWidth: 1,
  padding: 10,
  opacity: 0.5,
  borderRadius: 6,
  },
});
export default preReg