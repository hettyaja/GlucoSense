import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { router } from 'expo-router'

const PaymentMethod = () => {
  return (
    <>
    <Header
        title='Manage payment methods'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
    />
    <View>
      <Text>PaymentMethod</Text>
    </View>

    </>
  )
}

export default PaymentMethod

const styles = StyleSheet.create({})