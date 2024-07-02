import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../../../constants/images';
import { Picker } from '@react-native-picker/picker';
import Header from '../../../components/Header';

const preReg = () => {
  const handleDismissAll = () => {
    router.dismissAll()
  };

  return (
    <>
    <Header
    title="Create New Password"
    leftButton='Back'
    onLeftButtonPress={() => router.back('Boundary/resetPwd2')}
  />
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Text style = {{fontFamily: 'Poppins-Bold', fontSize: 20, marginLeft: 30, marginTop: 35}}>Enter new password</Text>
      <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 30, marginRight: 100, color: '#808080'}}>Your new password must be different
from the previously used password.</Text>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14,marginLeft: 30, marginTop: 15}}>New password</Text>
      <TextInput secureTextEntry={true} style={[styles.input, {color: "black", marginLeft: 30}]}/>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 10,marginLeft: 30, marginTop: 5, color: '#808080'}}>Must be at least 8 characters.</Text>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14,marginLeft: 30, marginTop: 10}}>Confirm password</Text>
      <TextInput secureTextEntry={true} style={[styles.input, {color: "black", marginLeft: 30}]}/>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 10,marginLeft: 30, marginTop: 5, color: '#808080'}}>Both password must match.</Text>
      <TouchableOpacity style={{ alignItems: 'center', marginTop: 10}} onPress={() => router.push({pathname:'Boundary/welcomePage', query: handleDismissAll()})}>
        <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Reset Password</Text>
      </View>
      </TouchableOpacity>
    </View>
    </>
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