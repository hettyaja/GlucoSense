import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Image} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import ImageButton from '../components/ImageButton';
import { images } from '../constants/images'

const PreReg = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButtons((prevSelectedButtons) => {
      if (prevSelectedButtons.includes(buttonIndex)) {
        return prevSelectedButtons.filter(index => index !== buttonIndex);
      } else {
        return [...prevSelectedButtons, buttonIndex];
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'25%', alignItems:'flex-start', paddingLeft:20, justifyContent:'center'}}>
          <ImageButton
            source={require("../assets/back(2).png")}
            imageSize={{width:24, height:24}}
            onPress={() => router.back('/question2')}
          />
        </View>
        <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
        <Text style={[styles.titleText, {paddingBottom:5}]}>User profiling</Text>
        <Image source={images.headerQuestion3} resizeMode='contain' style={{width:168, height:7}}/>
        </View>
        <View style={{width:'25%'}}/>
      </View>
      
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 24, paddingLeft: 60, paddingTop: 60, paddingRight: 80 }}>What measurement devices do you use?</Text>
      <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12, textAlign: "center", paddingTop: 10 }}>Select all that apply</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButtons.includes(1) ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Text style={styles.buttonText}>Basic blood glucose meter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButtons.includes(2) ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Text style={styles.buttonText}>Connected blood glucose meter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButtons.includes(3) ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(3)}
          >
            <Text style={styles.buttonText}>CGM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButtons.includes(4) ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(4)}
          >
            <Text style={styles.buttonText}>Insulin pump</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButtons.includes(5) ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(5)}
          >
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignItems: 'center', paddingTop: 100 }} onPress={() => router.push('/question4')}>
        <View style={{ backgroundColor: "#D96B41", width: 312, height: 50, borderRadius: 8, justifyContent: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Continue</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    justifyContent: 'center', // Center text vertically
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    textAlign: 'center',
    color: 'black',
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: "center"
  },
});

export default PreReg;