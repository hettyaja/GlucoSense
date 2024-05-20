import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EditProfilePage({ navigation, route }) {
  const { profile } = route.params || {};
  const [shopName, setShopName] = useState(profile?.shopName || '');
  const [username, setUsername] = useState(profile?.username || '');
  const [description, setDescription] = useState(profile?.description || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || '');
  const [shopAddress, setShopAddress] = useState(profile?.shopAddress || '');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(profile?.image || null);

  const handleSave = () => {
    const updatedProfile = { shopName, username, description, phoneNumber, shopAddress, image };
    navigation.navigate('Setting', { profile: updatedProfile });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/rectangle.png')}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text>Change Photo</Text>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Shop name"
            value={shopName}
            onChangeText={setShopName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Shop Address"
            value={shopAddress}
            onChangeText={setShopAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Reset password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headerImage: {
    resizeMode: 'cover',
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
