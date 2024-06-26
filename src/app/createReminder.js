import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { router } from 'expo-router'

const createReminder = () => {

  const handleLeftButton = () => {
    router.back()
  }

  const handleRightButton = () => {
    router.replace('reminder')
  }


  return (
    <>
      <Header
        title="Create Reminder"
        leftButton="Back"
        rightButton="Save"
        onLeftButtonPress={handleLeftButton}
        onRightButtonPress={handleRightButton}
      />
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text>Type</Text>
          </View>
          <View style={styles.item}>
            <Text>Day</Text>
          </View>
          <View style={styles.item}>
            <Text>Time</Text>
          </View>
        </View>
      </View>
    </>

  )
}

export default createReminder

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5f5f5'
  },
  section: {
    backgroundColor:'white',
    marginTop:16,
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor:'#808080'
  },
  item: {
    padding:16
  }
})