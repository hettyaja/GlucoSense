// app/profileBP.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, Stack } from 'expo-router';
import ImageButton from '../components/ImageButton';
import { useBPProfile } from './context/BPProfileContext';

const profileBP = () => {
  const router = useRouter();
  const { BPProfileData, setBPProfileData } = useBPProfile();

  const [photoUri, setPhotoUri] = useState(BPProfileData.photoUri);
  const [shopName, setShopName] = useState(BPProfileData.shopName);
  const [username, setUsername] = useState(BPProfileData.username);
  const [location, setLocation] = useState(BPProfileData.location);
  const [description, setDescription] = useState(BPProfileData.description);

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
    setBPProfileData({ photoUri, shopName, username, location, description });
    router.back('/(tabsBP)/settingBP');
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Edit profile',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerLeft: () => (
          <ImageButton
            source={require("../assets/back.png")}
            imageSize={{width:24, height:24}}
            customStyle={{paddingLeft:10}}
            onPress={() => router.back('/profileBP')} //Perbaiki 
          />
        ),
        headerRight: () => (
          <TouchableOpacity style={styles.button}
            onPress={saveProfile}>
            <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-Regular', fontSize:14, color:'white'}}>Save</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Edit profile',
        headerTitleAlign: 'center',
      }}/>
      <View style={styles.container}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <Image 
            source={photoUri ? { uri: photoUri } : { uri: '' }} // Use selected image or placeholder
            style={styles.profilePhoto}
            resizeMode="cover" // Ensure the image covers the placeholder
          />
          <TouchableOpacity style={styles.changePhotoButton} onPress={addImage}>
            <Text>Change photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.section}>

          <View style={styles.item}>
            <Text style={styles.text}>Shop name</Text>
            <TextInput style={styles.text}
              placeholder='Add Shop Name'
              value={shopName}
              onChangeText={setShopName}/>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Username</Text>
            <TextInput style={styles.text}
              placeholder = 'Add username'
              value={username}
              onChangeText={setUsername}
              editable={false}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.text}
              placeholder = 'Add a brief description'
              value={description}
              onChangeText={setDescription}/>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Phone number</Text>
            <TextInput style={styles.text}
              placeholder = 'Add phone number'
              keyboardType="numeric" 
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Shop address</Text>
            <TextInput style={styles.text}
              placeholder = 'Add shop address'
              value={location}
             onChangeText={setLocation}/>
          </View>

          <View style={styles.item}>
            <TouchableOpacity onPress={()=> router.push('resetPwd1')}>
              <Text style={styles.resetPasswordText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
 
  resetPasswordText: {
    fontFamily: 'Poppins-Regular',
    fontSize:14,
    color: 'red'
  },
  section: {
    backgroundColor:'white',
    marginTop:24,
    // margin:,
  },
  item: {
    flexDirection:'row',
    padding:16,
    justifyContent:'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize:14
  }
});

export default profileBP;