import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
    <View style={{flex:3, backgroundColor:"#f5f5f5"}}>
      <View style={{backgroundColor:"#E58B68"}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center', marginBottom: 10}}>Diary</Text>
      </View>
      </View>
      <View style={styles.container1}>
        <View style={{backgroundColor: '#f1f1f1', width: 350, borderRadius: 8, alignSelf: 'center'}}>
            <TextInput style={{fontFamily: 'Poppins-Medium', fontSize: 12, marginLeft: 35}} placeholder="Search Diary" placeholderTextColor= "808080"></TextInput>
        </View>
      </View>
      <View style = {{alignItems:'center', marginTop: 200}}>
        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18,}}>Input data to get started</Text>
        <Link style={{fontFamily: 'Poppins-Bold', fontSize: 18, marginTop: 15, color: '#0044cc'}} href="login/addDiary">Create Record {'>'}</Link>
      </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: "#ffffff",
    width: 160,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: 'transparent',
    marginBottom: 10,
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
    backgroundColor: 'white',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#808080'
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '50%',
    marginLeft: 220,
    color: '#808080',
  },
  pickerItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  shadow: {
    elevation: 3, // Apply elevation for drop shadow
  },

});
export default preReg