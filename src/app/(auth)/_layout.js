import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen
          name="loginPage"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="registerPage"
          options={{
            headerShown:false
          }}/>
    </Stack>
  )
}

export default _layout