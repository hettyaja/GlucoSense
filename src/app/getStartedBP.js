import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function GetStartedPage({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('/assets/getStarted.png')} // Update the path to use the uploaded image
        style={styles.topContainer}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Health Conscious Market Opportunity</Text>
        <Text style={styles.description}>Tap into a growing market by offering diabetic-friendly meal options</Text>
        <View style={styles.pagination}>
          <Image
            source={require('/assets/dot.png')} // Ensure you have this image in the assets folder
            style={styles.dot}
          />
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Image
            source={require('/assets/nextcircle.png')} // Ensure you have this image in the assets folder
            style={styles.nextButtonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
    alignSelf: 'flex-start', // Align dots to the left
    paddingLeft: 30, // Adjust padding to match design
  },
  dot: {
    marginTop: 85,
    right: 35,
    marginHorizontal: 4,
  },
  nextButton: {
    width: 70,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonImage: {
    width: 30,
    height: 30,
    marginLeft: 250,
    marginBottom: 100
  },
});
