import { View, Text, StyleSheet, Image, Button} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { images } from '../../constants/images';

const welcome3 = () => {
  return (
    <View style={{flex:1}}>
        <SafeAreaView style={{flex:6, backgroundColor:"#E58B68", alignItems:"center"}}>

        </SafeAreaView>
        <View style={{flex:3, backgroundColor:"white", alignItems:"center", paddingTop:20}}>
          <Text style={{fontFamily:"Poppins-SemiBold", fontSize:20}}>Track your glucose daily</Text>
        </View>
        <View style={{flex:2, backgroundColor:"white", justifyContent:"space-between", flexDirection:"row", paddingLeft:20, paddingRight:20}}>
            <Image source={ images.welcome1 } resizeMode='contain'/>
            <Link href="/welcome3">Next Page</Link>
        </View>
    </View>
  )
}

export default welcome3