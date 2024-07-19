import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../../constants/images';
import { Picker } from '@react-native-picker/picker';
import Header from '../../components/Header';
import ResetPasswordController from '../../Controller/ResetPasswordController';


const preReg = () => {
  const [email, setEmail] = useState('')

  const handleButtonPress = () => {
    ResetPasswordController.resetPassword(email)
    router.replace('Boundary/LoginUI')
  }

  return (
    <>
      <Header
        title="Reset Password"
        leftButton='Back'
        onLeftButtonPress={() => router.back('Boundary/loginPage')}
      />
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <Text style = {{fontFamily: 'Poppins-Bold', fontSize: 20, marginLeft: 16, marginTop: 35}}>Email address here</Text>
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 16, marginRight: 100, color: '#808080'}}>Please enter your email address associated with your account.</Text>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14,marginLeft: 16, marginTop: 16}}>Email</Text>
        <TextInput style={[styles.input, {color: "black"}]} value={email} onChangeText={text => setEmail(text)} />
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 125 }} onPress = {() => handleButtonPress()}>
          <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Send</Text>
        </View>
        </TouchableOpacity>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  input: {
  margin:16,
  marginTop: 8,
  borderWidth: 1,
  padding: 10,
  opacity: 0.5,
  borderRadius: 6,
  },
});
export default preReg