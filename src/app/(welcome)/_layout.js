import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen
          name="welcome1"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="welcome2"
          options={{
            headerShown:false
          }}/>
        <Stack.Screen
          name="welcome3"
          options={{
            headerShown:false
          }}/>
    </Stack>
  )
}

export default _layout