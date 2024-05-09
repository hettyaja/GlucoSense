import React from 'react'
import {Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen
          name="welcomePage_1"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="welcomePage_2"
          options={{
            headerShown:false
          }}/>
        <Stack.Screen
          name="welcomePage_3"
          options={{
            headerShown:false
          }}/>
    </Stack>
  )
}

export default _layout