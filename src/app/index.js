import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link , Redirect} from 'expo-router'

const index = () => {
  // return (
  //   <View className="flex-1 items-center justify-center bg-white">
  //     <Text className="text-2xl">Hidasdsadsa</Text>
  //     <Link href="/getStartedPage_1">Go To welcome 1</Link>
  //   </View>
  // );
  return <Redirect href="getStartedPage_1"/>
}

export default index