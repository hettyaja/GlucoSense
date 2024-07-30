import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { router } from 'expo-router'

const SystemAdminProfileUI = () => {
  return (
    <>
    <Header
      title='Profile'
      leftButton='Back'
      onLeftButtonPress={() => router.back()}
    />
    <View>
      <Text>SystemAdminProfileUI</Text>
    </View>
    </>
  )
}

export default SystemAdminProfileUI

const styles = StyleSheet.create({})