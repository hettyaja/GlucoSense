import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '../service/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteImage, uploadProfileImage } from '../service/storageService';
import UpdateBpProfileController from '../Controller/UpdateBpProfileController';
import ViewProfileBpController from '../Controller/ViewProfileBpController';

const profileBP = () => {
  const router = useRouter();
  const { user } = useAuth();
  const uid = user.uid;
  const [photoUri, setPhotoUri] = useState('');
  const [tempPhotoUri, setTempPhotoUri] = useState(null);
  const [entityName, setEntityName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
  const [UEN, setUEN] = useState('');
  const [description, setDescription] = useState('');
  const [postal, setPostal] = useState('');
  const [city, setCity] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const getBPProfile = async () => {
      if (uid) {
        try {
          const data = await ViewProfileBpController.viewProfileBp(uid);
          if (data) {
            setPhotoUri(data.photoUri || '');
            setName(data.name || '');
            setPhoneNum(data.phoneNum || '');
            setEmail(data.email || '');
            setEntityName(data.entityName || '');
            setUEN(data.UEN || '');
            setAddress(data.address || '');
            setDescription(data.description || '');
            setCity(data.city || '');
            setPostal(data.postal || '');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    getBPProfile();
  }, [uid]);

  const addImage = async () => {
    if (isEditable) {
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
        setTempPhotoUri(result.assets[0].uri);
      }
    }
  };

  const toggleEdit = async () => {
    if (isEditable) {
      if (!name || !email || !phoneNum || !address) {
        Alert.alert('Empty Fields', 'Please fill out all required fields.');
        return;
      }

      let finalPhotoUri = photoUri;

      if (tempPhotoUri) {
        if (photoUri) {
          await deleteImage(photoUri); // Delete the previous image if it exists
        }
        finalPhotoUri = await uploadProfileImage(uid, tempPhotoUri); // Upload the new image and get its URL
        setPhotoUri(finalPhotoUri); // Update the photoUri state with the new URL
      }

      const updatedDetails = {
        name,
        email,
        phoneNum,
        address,
        description,
        entityName,
        UEN,
        postal,
        city,
        photoUri: finalPhotoUri,
      };

      try {
        await UpdateBpProfileController.updateBpProfile(uid, updatedDetails);
        console.log('Profile updated successfully!');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
    setIsEditable(!isEditable);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Edit profile',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Medium', fontSize: 16},
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='chevron-back' size={24} color='white' />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white' }}>
                {isEditable ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
      <ScrollView>
        <View style={styles.photoSection}>
          <TouchableOpacity style={{ alignItems: 'center', margin: 24 }} onPress={isEditable ? addImage : null}>
            {tempPhotoUri ? (
              <Image style={styles.profileImage} source={{ uri: tempPhotoUri }} />
            ) : (
              photoUri ? (
                <Image style={styles.profileImage} source={{ uri: photoUri }} />
              ) : (
                <FontAwesome name="user-circle" color="grey" size={80} />
              )
            )}
            {isEditable && <Text style={styles.changePhotoText}>Change Photo</Text>}
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Personal Information</Text>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Name"
              value={name}
              onChangeText={setName}
              editable={isEditable}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Phone Number"
              value={phoneNum}
              onChangeText={setPhoneNum}
              editable={isEditable}
              maxLength={8}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Email"
              value={email}
              onChangeText={setEmail}
              editable={isEditable}
            />
          </View>
        </View>

        <Text style={styles.subheader}>Business Information</Text>

        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.text}>Shop Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Add shop name"
              value={entityName}
              onChangeText={setEntityName}
              editable={isEditable}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>UEN</Text>
            <TextInput style={styles.input} value={UEN} editable={false} />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Add a brief description"
              value={description}
              onChangeText={setDescription}
              editable={isEditable}
            />
          </View>
        </View>

        <Text style={styles.subheader}>Address Information</Text>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.text}>City/Town</Text>
            <TextInput style={styles.input} value={city} editable={false} />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Add address"
              value={address}
              onChangeText={setAddress}
              editable={isEditable}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Postal Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Add postal code"
              value={postal}
              onChangeText={(Number) => setPostal(Number)}
              editable={isEditable}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  photoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  changePhotoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'blue',
    marginTop: 8,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingLeft: 10,
  },
  subheader: {
    paddingHorizontal: 8,
    marginTop: 24,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default profileBP;
