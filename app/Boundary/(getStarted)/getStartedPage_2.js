import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { images } from '../../constants/images';

const getStartedPage_2 = () => {
  return (
    <>
    <Stack.Screen
          options={{
            headerShown:false
          }}
        />
        <View style={{flex:1}}>
        <View style={{ flex: 7, backgroundColor: "#E58B68" }}>
          {/* Center the image within this View */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={images.getStarted2} style={{ width: 400, height: 400 }} />
          </View>
        </View>
        
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
            Expert-Crafted Nutrition
          </Text>

          <Text style={{
            fontFamily:"Poppins-Regular",
            fontSize:14,
            textAlign:"center",
            paddingTop:12,
            color:"#808080"
          }}>
            {'Get personalized diet plans\nand healthy meals created by\n experts to support your health.'}
          </Text>
        </View>

        <View style={{
          flex:2,
          backgroundColor:"white",
          justifyContent:"space-between",
          flexDirection:"row",
          paddingLeft:20,
          paddingRight:20,
          paddingBottom:50,
          alignItems:"center"
        }}>

          <Image source={ images.welcome2 } style={{width:70, height:10}}/>

          <TouchableOpacity  onPress={() => router.push('Boundary/getStartedPage_3')} >
            <Ionicons name='chevron-forward-circle' size={56} color='#E58B68'/>
          </TouchableOpacity>
        </View>
    </View>
    
    </>
    
  )
}

export default getStartedPage_2