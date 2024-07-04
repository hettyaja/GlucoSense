import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import { images } from '../constants/images'
import { router } from 'expo-router'

const welcomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <Image source={images.logo} />
        <Text style={styles.welcomeText}>
          Welcome!
        </Text>
        
        <Text style={styles.subTitleText}>
          Join with Us & Enjoy Healthy Life!
        </Text>

        <TouchableOpacity
          onPress={() => router.push("Boundary/preReg")}
          style={[styles.button, styles.getStartedButton]}>
          <Text style={styles.buttonText}>{"Let's get started"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("Boundary/loginPage")}
          style={[styles.button, styles.signInButton]}>
          <Text style={styles.buttonText}>{"Sign in"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default welcomePage

const styles = StyleSheet.create({
  welcomeText: {
    fontFamily: "Poppins-Black",
    fontSize: 36,
    color: "#E58B68",
    paddingTop: 250,
  },
  subTitleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#808080",
    paddingTop: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    width: "55%",
    height: "5%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedButton: {
    backgroundColor: "#26513A",
  },
  signInButton: {
    backgroundColor: "#E58B68",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
    fontSize: 13,
  },
})
