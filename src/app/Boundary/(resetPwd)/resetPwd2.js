import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../../../constants/images';
import { Picker } from '@react-native-picker/picker';
import Header from '../../../components/Header';


const preReg = () => {
  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value is not empty
    if (value !== '' && index < otp.length - 1) {
      const nextInput = index + 1;
      inputs[nextInput].focus();
    }

    // Call the onChange callback if needed
    // onChange(newOtp.join(""));
  };
  let inputs = [];
  return (
    <>
      <Header
          title="OTP Verification"
          leftButton='Back'
          onLeftButtonPress={() => router.back('Boundary/resetPwd1')}
        />
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Text style = {{fontFamily: 'Poppins-Bold', fontSize: 20, marginLeft: 30, marginTop: 35}}>Get your code</Text>
      <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 30, marginRight: 100, color: '#808080'}}>Please enter the 6 digit code that you receive on your email address.</Text>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14,marginLeft: 30, marginTop: 15}}>Verification Code</Text>
        <View style={styles.inputContainer}>
            {otp.map((data, index) => (
            <TextInput
                key={index}
                ref={input => inputs[index] = input}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={data}
                onChangeText={value => handleChange(value, index)}
            />
            ))}
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
            <Text style={{ fontSize: 10, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#808080' }}>Didn't receive the code? </Text>
            <Link href="login/viewDiary" style={{ fontSize: 10, fontFamily: "Poppins-Bold", textAlign: 'center', color: '#000000' }}>Resend Code</Link>
        </View>
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 93 }} onPress = {() => router.push('Boundary/resetPwd3')}>
        <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Verify</Text>
      </View>
      </TouchableOpacity>
    </View>
    </>
    
  )
}
const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    input: {
      width: 40,
      height: 40,
      marginHorizontal: 10.5,
      textAlign: 'center',
      fontSize: 20,
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 6,
    },
    resendText: {
      marginTop: 20,
      color: 'gray',
    },
    otpDisplay: {
      marginTop: 20,
      fontSize: 16,
    },
});
export default preReg