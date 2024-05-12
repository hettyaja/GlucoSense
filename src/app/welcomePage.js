import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import { images } from '../constants/images'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

const welcomePage = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white", alignItems:"center"}}>
        <Image source={images.logo}/>
        <Text style={{
            fontFamily:"Poppins-Black",
            fontSize:36,
            color:"#E58B68",
            paddingTop:250
        }}>
            Welcome!
        </Text>
        
        <Text style={{
            fontFamily:"Poppins-Medium",
            fontSize:16,
            color:"#808080",
            paddingTop:5
        }}>
            Join with Us & Enjoy Healthy Life!
        </Text>

        <CustomButton
            title="Let's get started"
            onPress={() => router.push("/preReg")}
            buttonColor="#26513A"
            customStyle={{ marginTop: 20 }}
        />

        <CustomButton
            title="Sign in"
            onPress={() => router.push("/login1")}
            buttonColor="#E58B68"
            customStyle={{ marginTop: 20 }}
        />
    </SafeAreaView>
  )
}

export default welcomePage
