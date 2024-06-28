import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, Stack } from 'expo-router';
import ImageButton from '../components/ImageButton';
import { fetchBPProfile } from './service/profileBPService'; // Adjust the import according to your file structure
import { useAuth } from './context/authContext'; // Adjust the import according to your file structure
import { ScrollView } from 'react-native-gesture-handler';

const profileBP = () => {
  const router = useRouter();
  const { user } = useAuth();
  const uid = user.uid;
  
  const [photoUri, setPhotoUri] = useState('');
  const [shopName, setShopName] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getBPProfile = async () => {
      if (uid) {
        try {
          const data = await fetchBPProfile(uid);
          if (data) {
            setPhotoUri(data.photoUri || '');
            setShopName(data.entityName || '');
            setUsername(data.NR || '');
            setAddress(data.address || '');
            setDescription(data.description || '');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    getBPProfile();
  }, [uid]);

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

  const saveProfile = async () => {
    try {
      const docRef = doc(db, 'businessPartner', uid);
      await setDoc(docRef, { photoUri, shopName, username, location, description }, { merge: true });
      router.back('/(tabsBP)/settingBP');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
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
            onPress={() => router.back('/profileBP')}
          />
        ),
        headerRight: () => (
          <TouchableOpacity style={styles.button} onPress={saveProfile}>
            <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-Regular', fontSize:14, color:'white'}}>Save</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Profile',
        headerTitleAlign: 'center',
      }}/>
      {/* <View style={styles.container}> */}
        <View style={styles.photoSection}>
          <Image 
            source={photoUri ? { uri: photoUri } : { uri: '' }}
            style={styles.profilePhoto}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.changePhotoButton} onPress={addImage}>
            <Text>Change photo</Text>
          </TouchableOpacity>
        </View>

    
      
        <Text style={styles.subheader}>Business Information</Text>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.text}>Shop name</Text>
            <TextInput style={styles.text}
              placeholder='Add Shop Name'
              value={shopName}
              onChangeText={setShopName}/>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Address</Text>
            <TextInput style={styles.text}
              placeholder='Add Address'
              value={username}
              onChangeText={setAddress}
              editable={false}
            />
          </View>
        </View>
          <View style={styles.item}>
            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.text}
              placeholder='Add a brief description'
              value={description}
              onChangeText={setDescription}/>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Phone number</Text>
            <TextInput style={styles.text}
              placeholder='Add phone number'
              keyboardType="numeric" 
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Name</Text>
            <TextInput style={styles.text}
              />
          </View>

          <View style={styles.item}>
            <TouchableOpacity onPress={()=> router.push('resetPwd1')}>
              <Text style={styles.resetPasswordText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
      
     
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#f5f5f5',
  // },

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
    color: '#f28b54',
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
    fontSize: 14,
    color: 'red'
  },
  section: {
    backgroundColor: 'white',
    marginTop: 24,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    paddingBottom: 100,
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  subheader:{
    paddingHorizontal: 16,
    marginTop: 24,
    fontSize: 10,
    fontFamily: "Poppins-Regular"
}
});

export default profileBP;