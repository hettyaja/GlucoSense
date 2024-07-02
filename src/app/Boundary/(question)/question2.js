import { View, Text, StyleSheet, Image, Button, TouchableOpacity, SafeAreaView, Platform} from 'react-native'
import React, { useState } from 'react';
import { router, Stack } from 'expo-router';
import ImageButton from '../../../components/ImageButton';
import { images } from '../../../constants/images'
import Ionicons from 'react-native-vector-icons/Ionicons'

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }

  const handleContinuePress = () => {
    if (selectedButton !== null) {
      router.push('Boundary/question3');
    }
  };

  return (
    <>
    <Stack.Screen options={{ headerShown:false}}/>

    <SafeAreaView style={styles.safeArea}>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'25%', alignItems:'flex-start', paddingLeft:20, justifyContent:'center'}}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={32} color='black'/>
          </TouchableOpacity>
        </View>
        <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
        <Text style={[styles.titleText, {paddingBottom:5}]}>User profiling</Text>
        <Image source={images.headerQuestion2} resizeMode='contain' style={{width:168, height:7}}/>
        </View>
        <View style={{width:'25%'}}/>
      </View>
      
      <Text style={{fontFamily:"Poppins-SemiBold", fontSize: 24, paddingLeft: 60, paddingTop: 60, paddingRight: 80}}>What type of diabetes do you have?</Text>
    
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 50 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Text style={styles.buttonText}>Type 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Text style={styles.buttonText}>Type 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 3 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(3)}
          >
            <Text style={styles.buttonText}>Gestational</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 4 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(4)}
          >
            <Text style={styles.buttonText}>Pre-diabetes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 5 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(5)}
          >
            <Text style={styles.buttonText}>Not sure</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignItems: 'center', marginTop:100}} onPress={handleContinuePress}
          disabled={selectedButton === null}>
        <View style={{  opacity: selectedButton === null ? 0.5 : 1, backgroundColor: '#D96B41', width: 312, height: 50, borderRadius: 8, justifyContent: 'center'}}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Continue</Text>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 50 :0,
    alignItems: 'center'
  },
  container: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: "#f5f5f5",
    width: 312,
    height: 50,
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
    fontSize:16,
    fontFamily:"Poppins-Medium",
    textAlign: 'center',
    color: 'black',
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: "center"
  },

});
export default preReg