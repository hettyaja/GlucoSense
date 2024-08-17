import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import DeleteBPController from '../../Controller/DeleteBPController';
import LogoutController from '../../Controller/LogoutController';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../service/AuthContext';
import ViewProfileBpController from '../../Controller/ViewProfileBpController';

const settingBP = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [photoUri, setPhotoUri] = useState();
  const [entityName, setentityName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const getBPProfile = async () => {
    if (user) {
      try {
        const data = await ViewProfileBpController.viewProfileBp(user.uid);
        if (data) {
          setPhotoUri(data.photoUri || '');
          setentityName(data.entityName || '');
          setLocation(data.address || '');
          setDescription(data.description || '');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBPProfile();
    }, [user.uid])
  );

  const handleSignOut = async () => {
    await LogoutController.logout();
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Delete account', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await DeleteBPController.deleteBP(user.uid);
            router.replace('Boundary/welcomePage');
          } catch (error) {
            console.error('Error deleting user profile:', error);
            alert('Error deleting user profile: ' + error.message);
          }
        },
      },
    ]);

  return (
    <>
      <Header
        title="Setting"
      />
      <View style={styles.container}>
        {/* Profile Card Section */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => router.push('Boundary/ViewProfileBpUI')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 24 }}>
          {photoUri ? (
          <Image
            style={styles.profileImage}
            source={{ uri: photoUri }} 
          /> ) : (
            <FontAwesome name="user-circle" color="grey" size={64} style={{marginRight:16}} />
           )}
            <View>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>{entityName}</Text>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>
              <Ionicons name='location-outline' size={16} style={styles.icon} />
                {location}
              </Text>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                {description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
      <View style = {styles.section}>
        
        <TouchableOpacity style={styles.optionButton} onPress={() => handleSignOut()}>
          <MaterialIcons name='logout' size={24} style={styles.icon} />
          <Text style={styles.optionButtonText}>Log out</Text>
        </TouchableOpacity>

        <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
        <TouchableOpacity style={styles.optionButton} onPress={createTwoButtonAlert}>
          <AntDesign name='deleteuser' size={24} style={styles.icon} />
          <Text style={styles.optionButtonText}>Delete business account</Text>
        </TouchableOpacity>
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
  section:{
    backgroundColor:'white',
    marginBottom:24,
    paddingHorizontal:16
  },
  profileCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 16,
    marginVertical: 24,
    borderRadius: 8,
    elevation: 5,
  },
  profileImage: {
    borderRadius: 100,
    borderColor: 'black',
    width: 64,
    height: 64,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileLocation: {
    color: '#666',
    marginTop: 5,
  },
  profileDescription: {
    color: '#666',
    marginTop: 10,
  },
  optionButton: {
    padding:8,
    flexDirection:'row',
    alignItems:'center'
  },
  optionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  icon: {
    paddingRight: 24,
  },
});

export default settingBP;
