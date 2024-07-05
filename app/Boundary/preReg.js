import { View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack } from 'expo-router'
import { images } from '../constants/images';
import ImageButton from '../components/ImageButton'
import Ionicons from 'react-native-vector-icons/Ionicons'

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }

  const handleNextPress = () => {
    if (selectedButton === 1) {
      router.push('Boundary/RegisterUserUI'); // Navigate to the user registration page
    } else if (selectedButton === 2) {
      router.push('Boundary/RegisterBPUI'); // Navigate to the business partner registration page
    }
  };

  return (
    <>
     <Stack.Screen
          options={{
            headerShown:false
          }}
        />
    
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <Image source={images.header} style={{position:"absolute", width:430, height:275}}/>
      <View style={{alignItems:'flex-start', width:"100%", paddingHorizontal:16}}>
      <TouchableOpacity onPress={() => router.back('welcomePage')}>
      <Ionicons name='chevron-back' size={32} color='white'/>
      </TouchableOpacity>
      </View>
      <Text style={{fontFamily:"Poppins-Bold", fontSize: 24, paddingLeft: 25, paddingTop: 100, color: '#FAF5E1'}}>Which one are you?</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 50 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1 ? styles.selectedButton : null,
              { marginRight: 20, alignItems:'center', justifyContent:'space-evenly'}, // Added margin to create space between buttons
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Image
            source={require('../assets/userIcon.png')}
            style={styles.image}
            />
            <Text style={[styles.buttonText, {}]}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2 ? styles.selectedButton : null,
              {alignItems:'center', justifyContent:'space-evenly'}
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Image
            source={require('../assets/businessIcon.png')}
            style={styles.image}
            />
            <Text style={[styles.buttonText]}>Business Partner</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignItems: 'center', marginTop: 100 }}
        onPress={handleNextPress}>
        <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular", textAlign: 'center', color: '#FAF5E1' }}>Next</Text>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#f5f5f5',
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