import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, Stack } from 'expo-router';
import ImageButton from '../components/ImageButton';
import { fetchBPProfile, updateProfile } from './service/profileBPService'; // Adjust the import according to your file structure
import { useAuth } from './context/authContext'; // Adjust the import according to your file structure



const profileBP = () => {
  const router = useRouter();
  const { user } = useAuth();
  const uid = user.uid;
  const [photoUri, setPhotoUri] = useState('');
  const [shopName, setShopName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
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
          const data = await fetchBPProfile(uid);
          if (data) {
            setPhotoUri(data.photoUri || '');
            setName(data.name || '');
            setPhoneNum(data.phoneNum || '');
            setEmail(data.email || '');
            setShopName(data.entityName || '');
            setUEN(data.UEN ||'');
            setAddress(data.address || '');
            setDescription(data.description || '');
            setCity(data.City || '');
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

  const toggleEdit = async () => {
    if (isEditable) {
      const updatedDetails = {
        name: name,
        email: email,
        phoneNum: phoneNum,
        address: address,
        description: description,
        shopName: shopName,
        UEN : UEN,
        postal: postal,
        city: city,
      };
        if (!name) {
            Alert.alert("Empty Field", "Name cannot be empty.");
            return;
        } else if (!email) {
            Alert.alert("Empty Field", "Email cannot be empty.");
            return;
        }else if(!phoneNum){
            Alert.alert("Empty Field", "Phone number cannot be empty");
            return;
        }else if(!address){
            Alert.alert("Empty Field", "Address not be empty");
            return;
        }
        try {
          await updateProfile(uid, updatedDetails)
          console.log('Profile updated successfully!');
        } catch (error) {
            alert(error.message);
        }
    }
    setIsEditable(!isEditable);
};


  // const saveProfile = async () => {
  //   try {
  //     const docRef = doc(db, 'businessPartner', uid);
  //     await setDoc(docRef, { photoUri, shopName, username, location, description }, { merge: true });
  //     router.back('/(tabsBP)/settingBP');
  //   } catch (error) {
  //     console.error('Error saving profile data:', error);
  //   }
  // };

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
          <TouchableOpacity style={styles.button} onPress={toggleEdit}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white' }}>
                            {isEditable ? 'Save' : 'Edit'}
            </Text>
  
          </TouchableOpacity>
        ),
        headerTitle: 'Profile',
        headerTitleAlign: 'center',
      }}/>
      {/* <View style={styles.container}> */}
      <ScrollView>
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

    
      
        <Text style={styles.subheader}>Personal Information</Text>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.text}>Name</Text>
            <TextInput style={styles.text}
              placeholder='Add Name'
              value={name}
              onChangeText={setName}
              editable = {isEditable}/>
             
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput style={styles.text}
              placeholder='Add Phone Number'
              value={phoneNum}
              onChangeText={setPhoneNum}
              editable = {isEditable}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.text}
              placeholder='Add Email'
              value={email}
              onChangeText={setEmail}
              
            />
          </View>
        </View>

        <Text style={styles.subheader}> Business Information </Text>
        
        <View style={styles.section}>
         <View style={styles.item}>
            <Text style={styles.text}>Shop Name</Text>
            <TextInput style={styles.text}
              placeholder='Add shop name'
              value = {shopName}
              onChangeText={setShopName}
              editable = {isEditable}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>UEN</Text>
            <TextInput style={styles.text}
              value = {UEN}
              editable = {false}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.text}
              placeholder='Add a brief description'
              value={description}
              onChangeText={setDescription}
              editable = {isEditable}
              />
          </View>
        </View>

        <Text style={styles.subheader}> Address Information </Text>          
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.text}>City/Town</Text>
            <TextInput style={styles.text}
              value = {city}
              editable = {false}
              />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Address</Text>
            <TextInput style={styles.text}
              placeholder='Add address'
              value={address}
              onChangeText={setAddress}
              />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Postal Code</Text>
            <TextInput style={styles.text}
              placeholder = 'Add postal code'
              value = {postal}
              onChangeText={Number => setPostal(Number)}
              />
          </View>

         
        </View>
        <View style={styles.section}>
          <View style={styles.item}>
              <TouchableOpacity onPress={()=> router.push('resetPwd1')}>
                <Text style={styles.resetPasswordText}>Reset Password</Text>
              </TouchableOpacity>
          </View>
        </View>
        
      
        </ScrollView>
     
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
    marginTop: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  subheader:{
    paddingHorizontal: 8,
    marginTop: 24,
    fontSize: 10,
    fontFamily: "Poppins-Regular"
}
});

export default profileBP;