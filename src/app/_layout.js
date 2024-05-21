import {React, useEffect} from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const _layout = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
        <Stack.Screen name="index"/>
        <Stack.Screen name="(getStarted)" options={{ headerShown:false}}/>
        <Stack.Screen name="loginPage" options={{ headerShown:false}}/>
        <Stack.Screen name="welcomePage" options={{ headerShown:false}}/>
        <Stack.Screen name="preReg" options={{ headerShown:false}}/>
        <Stack.Screen name="getStartedBP" options={{ headerShown:false}}/>
        <Stack.Screen name="registerPage" options={{ headerShown:false}}/>
        <Stack.Screen name="question1" options={{ headerShown:false}}/>
        <Stack.Screen name="question2" options={{ headerShown:false}}/>
        <Stack.Screen name="question3" options={{ headerShown:false}}/>
        <Stack.Screen name="question4" options={{ headerShown:false}}/>
        <Stack.Screen name="question5" options={{ headerShown:false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown:false}}/>
        <Stack.Screen name="registerBP" options={{ headerShown:false}}/>
        {/* <Stack.Screen name="(auth)"/> */}
    </Stack>
  )
}

export default _layout