import { View, Text, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {router, Stack } from 'expo-router'
import ImageButton from '../../components/ImageButton'

const getStartedPage_1 = () => {
  return (
    <>
    <Stack.Screen options={{headerShown:false}}/>

    <View style={{flex:1}}>
        <SafeAreaView style={{
          flex:6,
          backgroundColor:"#E58B68"
        }}>
        </SafeAreaView>

        <View style={{
          flex:3,
          backgroundColor:"white",
          alignItems:"center",
          paddingTop:24
        }}>

          <Text style={{
            fontFamily:"Poppins-Bold",
            fontSize:16
          }}>
            Health Conscious Market Opportunity 
          </Text>

          <Text style={{
            fontFamily:"Poppins-Regular",
            fontSize:14,
            textAlign:"center",
            paddingTop:12,
            color:"#808080"
          }}>
            {'Tap into a growing market\nby offering diabetic-friendly\nmeal options.'}
          </Text>
        </View>

        <View style={{
          flex:2,
          backgroundColor:"white",
          justifyContent:"flex-end",
          flexDirection:"row",
          paddingLeft:20,
          paddingRight:20,
          paddingBottom:50,
          alignItems:"center"
        }}>
        
            <ImageButton
              source={require("../../assets/next.png")}
              onPress={() => router.push('Boundary/RegisterBPUI')}
            />
        </View>
    </View>
    </>
    
  )
}

export default getStartedPage_1