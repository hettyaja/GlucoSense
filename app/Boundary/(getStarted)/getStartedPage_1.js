import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {router, Stack } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { images } from '../../constants/images';
import ImageButton from '../../components/ImageButton'

const getStartedPage_1 = () => {
  return (
    <>
      <Stack.Screen options={{headerShown:false}}/>
      <View style={{flex:1}}>
      <View style={{ flex: 7, backgroundColor: "#E58B68" }}>
          {/* Center the image within this View */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={images.getStarted1} style={{ width: 650, height: 650 }} />
          </View>
        </View>

      <View style={{
        flex:3,
        backgroundColor:"white",
        alignItems:"center",
        paddingTop:24
      }}>
      <Text style={{fontFamily:"Poppins-Bold", fontSize:16}}>
        Seamless Glucose Monitoring
      </Text>

          <Text style={{
            fontFamily:"Poppins-Regular",
            fontSize:14,
            textAlign:"center",
            paddingTop:12,
            color:"#808080"
          }}>
            {'Bluetooth and camera scans\nfor precise tracking,\nensuring peace of mind.'}
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
          
          <Image source={ images.welcome1 } style={{width:70, height:10}}/>

          <TouchableOpacity  onPress={() => router.push('Boundary/getStartedPage_2')} >
            <Ionicons name='chevron-forward-circle' size={56} color='#E58B68'/>
          </TouchableOpacity>
        </View>
    </View>
  
    </>
  )  
}

export default getStartedPage_1