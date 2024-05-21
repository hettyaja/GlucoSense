//SearchBox.js
import React from 'react';
import { Image, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

const SearchBox = ({ placeholder, onChangeText, onPressSearch }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPressSearch}>
        <Image
          source={require('/Image/Frame.png')} // Update with the correct path to your image
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={styles.placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
  },
  container: {
    height: 50, // Adjust height as needed
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    marginLeft: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    color: 'black',
    paddingHorizontal: 2
  },
  iconContainer: {
    padding: 5,
  },
  placeholder:{
  color: 'black',
  fontFamily: 'Poppins'
  }, // Adjust padding as needed
});

export default SearchBox;