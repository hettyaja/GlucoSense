import { View, Text, StyleSheet, Image, Button, TouchableOpacity, SafeAreaView, Platform} from 'react-native'
import React, { useState } from 'react';
import { router } from 'expo-router';
import ImageButton from '../components/ImageButton';
import { images } from '../constants/images'

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'25%', alignItems:'flex-start', paddingLeft:20, justifyContent:'center'}}>
          <ImageButton
            source={require("../assets/back(2).png")}
            imageSize={{width:24, height:24}}
            onPress={() => router.back('/question4')}
          />
        </View>
        <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
        <Text style={[styles.titleText, {paddingBottom:5}]}>User profiling</Text>
        <Image source={images.headerQuestion5} resizeMode='contain' style={{width:168, height:7}}/>
        </View>
        <View style={{width:'25%'}}/>
      </View>
      <Text style={{fontFamily:"Poppins-SemiBold", fontSize: 24, paddingLeft: 60, paddingTop: 60, paddingRight: 80}}>Do you follow any specific dietary restrictions?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 50 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Text style={styles.buttonText}>Vegetarian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Text style={styles.buttonText}>Vegan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 3 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(3)}
          >
            <Text style={styles.buttonText}>Gluten-free</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 4 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(4)}
          >
            <Text style={styles.buttonText}>Low-carb</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 5 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(5)}
          >
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignItems: 'center', paddingTop: 100 }} onPress={() => router.push('/(tabs)/home')}>
        <View style={{ backgroundColor: "#D96B41", width: 312, height: 50, borderRadius: 8, justifyContent: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Finish</Text>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
    
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