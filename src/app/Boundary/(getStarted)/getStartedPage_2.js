import { View, Text, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack } from 'expo-router'
import { images } from '../../../constants/images';
import ImageButton from '../../../components/ImageButton'

const getStartedPage_2 = () => {
  return (
    <>
    <Stack.Screen
          options={{
            headerShown:false
          }}
        />
        <View style={{flex:1}}>
        <SafeAreaView style={{
          flex:6,
          backgroundColor:"#E58B68",
          alignItems:"center"
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
            Effortless Food Journaling
          </Text>

          <Text style={{
            fontFamily:"Poppins-Regular",
            fontSize:14,
            textAlign:"center",
            paddingTop:12,
            color:"#808080"
          }}>
            {'Effortlessly log meals with\nbarcode scans, image recognition\nfor a comprehensive food diary.'}
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

            <Image source={ images.welcome2 }/>

            <ImageButton
            source={require("../../../assets/next.png")}
            onPress={() => router.push('/getStartedPage_3')}/>
        </View>
    </View>
    
    </>
    
  )
}

export default getStartedPage_2