import { View, Text, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack } from 'expo-router'
import { images } from '../../../constants/images';
import ImageButton from '../../../components/ImageButton';

const getStartedPage_3 = () => {
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
            Customized Diet, Delivered!
          </Text>

          <Text style={{
            fontFamily:"Poppins-Regular",
            fontSize:14,
            textAlign:"center",
            paddingTop:12,
            color:"#808080"
          }}>
              {'Order personalized plans and\nhealthy meals for easy,\nnutritious eating.'}
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

            <Image source={ images.welcome3 }/>

            <ImageButton
            source={require("../../../assets/next.png")}
            onPress={() => router.push('welcomePage')}/>
        </View>
    </View>
    </>
    
  )
}

export default getStartedPage_3