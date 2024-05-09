import { View, Text, StyleSheet, Image, Button} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { images } from '../../constants/images';

const welcome2= () => {
  return (
    <View className="flex-1">
        <SafeAreaView className=" flex-6 bg-primary items-center">
          <Text className="font-pbold">
              
          </Text>
        </SafeAreaView>
        <View className="flex-3 bg-white items-center pt-10">
          <Text className="font-pregular text-xl">Track your glucose daily</Text>
        </View>
        <View className="flex-2 bg-white justify-between flex-row px-10">
            <Image source={ images.welcome1 } resizeMode='contain'/>
            <Link href="/welcome3">Next Page</Link>
        </View>
    </View>
  )
}

export default welcome2