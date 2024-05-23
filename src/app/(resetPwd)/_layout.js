import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import ImageButton from '../../components/ImageButton'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='resetPwd1' options={{
            title: 'Reset Password',
            headerStyle: { backgroundColor: '#E58B68' },
            headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
            headerLeft: () => (
              <ImageButton
                source={require("../../assets/back.png")}
                imageSize={{width:24, height:24}}
                onPress={() => router.back('/registerPage')}
              />
            )}}
        />
        <Stack.Screen name='resetPwd2' options={{
            title: 'Check your email',
            headerStyle: { backgroundColor: '#E58B68' },
            headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
            headerLeft: () => (
              <ImageButton
                source={require("../../assets/back.png")}
                imageSize={{width:24, height:24}}
                onPress={() => router.back('/registerPage')}
              />
            )}}
        />
        <Stack.Screen name='resetPwd3' options={{
            title: 'Create new password',
            headerStyle: { backgroundColor: '#E58B68' },
            headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
            headerLeft: () => (
              <ImageButton
                source={require("../../assets/back.png")}
                imageSize={{width:24, height:24}}
                onPress={() => router.back('/registerPage')}
              />
            )}}
        />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})