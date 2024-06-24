import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='insightSA'/>
      <Tabs.Screen name='partnerSA'/>
      <Tabs.Screen name='settingSA'/>
      <Tabs.Screen name='userSA'/>
      
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})