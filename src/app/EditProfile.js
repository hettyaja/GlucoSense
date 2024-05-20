// EditProfile.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ navigation, profileData, setProfileData }) => {
  const [photoUri, setPhotoUri] = useState(profileData.photoUri);
  const [shopName, setShopName] = useState(profileData.shopName);
  const [username, setUsername] = useState(profileData.username);
  const [location, setLocation] = useState(profileData.location);
  const [description, setDescription] = useState(profileData.description);

  const addImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    setProfileData({ photoUri, shopName, username, location, description });
    navigation.navigate('ViewProfile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Photo Section */}
      <View style={styles.photoSection}>
        <Image 
          source={photoUri ? { uri: photoUri } : { uri: '' }} // Use selected image or placeholder
          style={styles.profilePhoto}
          resizeMode="cover" // Ensure the image covers the placeholder
        />
        <TouchableOpacity style={styles.changePhotoButton} onPress={addImage}>
          <Text style={styles.changePhotoText}>Change photo</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <View style={styles.formRow}>
          <Text style={styles.label}>Shop name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Add Shop name" 
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // Translucent placeholder color
            value={shopName}
            onChangeText={setShopName}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Add username" 
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // Translucent placeholder color
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Add a brief description" 
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // Translucent placeholder color
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Add phone number" 
            keyboardType="numeric" 
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // Translucent placeholder color         
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Shop Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Add shop address" 
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // Translucent placeholder color
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <TouchableOpacity style={styles.resetPasswordButton}>
          <Text style={styles.resetPasswordText}>Reset password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f28b54', // Adjust color as needed
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  photoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    color: '#f28b54', // Adjust color as needed
    
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    paddingLeft: 10, // Adjust padding to move the underline to the right
    marginLeft: 20,
    paddingVertical: 5,
    fontSize: 14,

  },
  resetPasswordButton: {
    marginTop: 20,
  },
  resetPasswordText: {
    color: '#f28b54', // Adjust color as needed
    textAlign: 'center',
  },
});

export default EditProfile;
