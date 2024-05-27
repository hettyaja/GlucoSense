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
    <View style={{flex:3, backgroundColor:'#E58B68', paddingTop:24}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
        <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center'}}>Food Order</Text>
      </View>
        <View style = {{backgroundColor: '#f5f5f5', marginTop: 8, height: 700}}>
          <TouchableOpacity style={styles.container1} onPress = {() => router.push('details')}>
            <View style={styles.container2}>
            </View>
            <View style={{marginLeft: 20}}>
                <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 22}}>Chicken Rice</Text>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 16}}>$4.50</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
    
    
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68', 
  },
  buttonText: {
    fontSize:12,
    fontFamily:"Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  saveButtonContainer: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 3, // Adjust the padding to increase the width
    paddingLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  container1: {
    marginTop: 15,
    backgroundColor: 'white',
    paddingVertical: 8,
    flexDirection: 'row',
  },
  container2: {
    marginLeft: 20,
    borderRadius: 8,
    width: 80,
    height: 80,
    backgroundColor: '#D9D9D9',
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '50%',
    marginLeft: 170,
    color: '#808080',
  },
  pickerItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    fontSize: 16, 
    fontFamily: 'Poppins-Medium', 
    marginLeft: 20, 
    marginVertical: 10,
  },
});
export default preReg