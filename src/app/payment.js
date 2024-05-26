import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView, } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '../../constants/images';
import { Picker } from '@react-native-picker/picker';

const preReg = () => {
    const [quantity, setQuantity] = useState(1);
    const [time, setTime] = useState(600); // 10 minutes in seconds
    const [isRunning, setIsRunning] = useState(true);
    const timerRef = useRef(null);
    
    useEffect(() => {
      if (isRunning && time > 0) {
        timerRef.current = setInterval(() => {
          setTime(prevTime => prevTime - 1);
        }, 1000);
      }
      return () => clearInterval(timerRef.current);
    }, [isRunning, time]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
  
    const increment = () => {
      setQuantity(quantity + 1);
    };
  
    const decrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
    
  return (
      <View style={{flex:3, backgroundColor:'#E58B68', paddingTop:24}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center'}}>Payment</Text>
        </View>
          <View style = {{backgroundColor: '#f5f5f5', marginTop: 8, height: 720}}>
          <View style={styles.container1}>
              <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginLeft: 20}}>Total Payment</Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginRight: 20}}>$7.50</Text>
              </View>
              <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 450, alignSelf: 'center'}}/>
              <View style ={{alignItems: 'center', marginTop: 10}}>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, color: '#9A9A9A'}}>Payment within:</Text>
                <Text style={styles.timerText}>{formatTime(time)}</Text>
              </View>
            </View> 
              <View style={styles.container2}/>
              <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20}} onPress = {() => router.push('login/confirm')}>
              <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Save QR</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.containerBottom}>
              <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14, marginLeft: 20, marginTop: 10}}>Please follow these instructions:</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10, marginLeft: 20, marginTop: 10}}>1. Save or screenshot the QR code to make the payment using PayNow</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10, marginLeft: 20, marginTop: 10}}>2. Make sure the recipient is XXXXXXXXXX.</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10, marginLeft: 20, marginTop: 10}}>3. Wait for the page to redirect you after the payament is made.</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10, marginLeft: 20, marginTop: 10}}>4. If page does not redirect after payment do ...............</Text>
            </View>
          </View>
      </View>
    
  )
}
const styles = StyleSheet.create({
  quantity: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold', 
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
    column: {
    flex: 1,
  },
    item: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68', 
  },
  buttonText: {
    fontSize:24,
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
  button1: {
    marginLeft: 120,
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  button2: {
    marginRight: 120,
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  container1: {
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  containerBottom: {
    backgroundColor: 'white',
    paddingVertical: 8,
    height: 300,
  },
  container4: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    marginTop: 20,
  },
  container3: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  container2: {
    alignSelf: 'center',
    width: 270,
    height: 270,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
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
  timerText: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 16, 
    color: 'red', 
    marginTop: 5,
  },
});
export default preReg;
