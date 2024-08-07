import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { decode, encode } from 'base-64';
import Header from '../components/Header';
import { router, useLocalSearchParams } from 'expo-router';


const ViewDietPlanOrderSummary = () => {
  const { orderData } = useLocalSearchParams()
  const [ parsedOrderData, setParsedOrderData ] = useState(orderData ? JSON.parse(decode(orderData)) : null)

  return (
    <>
    <Header
      title="Order Summary"
      leftButton="Back"
      onLeftButtonPress={() => router.back()}
    />
    <View>
      <Text>ViewDietPlanOrderSummary</Text>
    </View>
    </>
  )
}

export default ViewDietPlanOrderSummary

const styles = StyleSheet.create({})