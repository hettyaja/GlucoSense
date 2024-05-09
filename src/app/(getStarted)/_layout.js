import React from 'react'
import {Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen
          name="getStartedPage_1"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="getStartedPage_2"
          options={{
            headerShown:false
          }}/>
        <Stack.Screen
          name="getStartedPage_3"
          options={{
            headerShown:false
          }}/>
    </Stack>
  )
}

export default _layout