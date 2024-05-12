import { View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { images } from '../constants/images';

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
    <View style={{flex:3, backgroundColor:"white", paddingTop:24}}>
        
      <Text style={{fontFamily:"Poppins-Bold", fontSize: 24, paddingLeft: 40, paddingTop: 120, color: '#FAF5E1'}}>Which one are you?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 50 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1 ? styles.selectedButton : null,
              { marginRight: 20 }, // Added margin to create space between buttons
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Text style={styles.buttonText}>Business Partner</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignItems: 'center', paddingTop: 100 }}>
        <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular", textAlign: 'center', color: '#FAF5E1' }}>Next</Text>
      </View>
      </TouchableOpacity>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  button: {
    backgroundColor: 'lightgray',
    width: 146,
    height: 217,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 17,
    borderWidth: 1, 
    borderColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68', 
  },
  buttonText: {
    fontSize:16,
    fontFamily:"Poppins-Bold",
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  testButton: {
    backgroundColor: '#000000',
    borderColor: '#E58B68', 
  },
});
export default preReg