import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="question1" options={{ headerShown:false}}/>
        <Stack.Screen name="question2" options={{ headerShown:false}}/>
        <Stack.Screen name="question3" options={{ headerShown:false}}/>
        <Stack.Screen name="question4" options={{ headerShown:false}}/>
        <Stack.Screen name="question5" options={{ headerShown:false}}/>
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})