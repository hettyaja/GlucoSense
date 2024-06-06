import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import { images } from '../constants/images'
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

        <TouchableOpacity
            onPress={() => router.push("/preReg")}
            style={[{
            marginTop: 20,
            backgroundColor:"#26513A",
            borderRadius:8,
            width:"55%",
            height:"5%",
            alignItems:'center',
            justifyContent:'center',
            }]}>
                <Text style={{color:"#FFFFFF", fontFamily:"Poppins-Bold", fontSize:13}}>{"Let's get started"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => router.push("/home")}
            style={[{
            marginTop: 20,
            backgroundColor:"#E58B68",
            borderRadius:8,
            width:"55%",
            height:"5%",
            alignItems:'center',
            justifyContent:'center',
            }]}>
                <Text style={{color:"#FFFFFF", fontFamily:"Poppins-Bold", fontSize:13}}>{"Sign in"}</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default welcomePage
