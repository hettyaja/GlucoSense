import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

const SearchBox = ({ placeholder, onChangeText, onPressSearch }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPressSearch}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    color: 'black',
  },
});

export default SearchBox;
