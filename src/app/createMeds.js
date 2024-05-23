import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../../constants/images';
import { Picker } from '@react-native-picker/picker';

const preReg = () => {
  


  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
    <View style={{flex:3, backgroundColor:'#E58B68', paddingTop:24}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
        <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center', marginLeft: 60}}>Medicine</Text>
        <TouchableOpacity onPress = {() => router.push('login/addMeds')}>
          <View style={styles.saveButtonContainer}>
            <Text style={{ color: 'white',fontFamily: 'Poppins-Regular', fontSize: 16, marginRight: 10}}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
        <View style = {{backgroundColor: '#f5f5f5', marginTop: 8, height: 700}}>
          <View style={styles.container1}>
            <Text style={styles.text}>ABC Pills</Text>
            
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
            <Link href="login/question3" style ={{fontSize: 14, fontFamily: 'Poppins-Medium', marginVertical: 10, color: '#E58B68', alignSelf: 'center', }}maxLength={2} keyboardType="numeric">Add Medicine</Link>
            
        </View>
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
    marginTop: 25,
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#808080',
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