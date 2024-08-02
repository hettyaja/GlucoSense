import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import Header from '../components/Header';

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }

  const handleNextPress = () => {
    if (selectedButton === 1) {
      router.push('Boundary/RegisterUserUI'); // Navigate to the user registration page
    } else if (selectedButton === 2) {
      router.push('Boundary/getStartedBP'); // Navigate to the business partner registration page
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View style={styles.container}>
        <Header
          title='Choose Your Profile'
          leftButton='Back'
          onLeftButtonPress={() => router.back()}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1 ? styles.selectedButton : null,
              { alignItems: 'center', justifyContent: 'space-evenly' },
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Image
              source={require('../assets/userIcon.png')}
              style={styles.image}
            />
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2 ? styles.selectedButton : null,
              { alignItems: 'center', justifyContent: 'space-evenly' }
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Image
              source={require('../assets/businessIcon.png')}
              style={styles.image}
            />
            <Text style={styles.buttonText}>Business Partner</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButtonContainer} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 120,
    flex: 1,
  },
  button: {
    backgroundColor: '#f5f5f5',
    width: '40%',
    height: '50%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 120,
  },
  nextButtonContainer: {
    backgroundColor: "#E58B68",
    width: '50%',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center'
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    color: 'white',
  },
});

export default preReg;
