// settingBP.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfile } from '../context/BPProfileContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const settingBP = () => {
    const router = useRouter();
    const { profileData } = useProfile();

    return (
      <>
        <View style={styles.container}>
            {/* Profile Card Section */}
            <View style={styles.profileCard}>
                <Image 
                    source={{ uri: profileData.photoUri || 'PhotoUri'}} // Use actual photo URI
                    style={styles.profilePhoto}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{profileData.shopName || 'Shop Name'}</Text>
                    <Text style={styles.profileUsername}>{profileData.username || 'Username'}</Text>
                    <Text style={styles.profileLocation}>{profileData.location || 'Location'}</Text>
                    <Text style={styles.profileDescription}>{profileData.description || 'Description'}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => router.push('/profileBP')}>
                    <Text style={styles.editButtonText}>✎</Text>
                </TouchableOpacity>
            </View>

            {/* Settings Options */}
            <TouchableOpacity style={styles.optionButton}>
                <MaterialCommunityIcons name='bell-outline' size={24} style={styles.icon}/>
                <Text style={styles.optionButtonText}>Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Octicons name='report' size={24} style={styles.icon}/>
                <Text style={styles.optionButtonText}>Report problem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
                <MaterialIcons name='logout' size={24} style={styles.icon}/>
                <Text style={styles.optionButtonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
                <AntDesign name='deleteuser' size={24} color='#E04530' style={styles.icon}/>
                <Text style={styles.deleteButtonText}>Delete business account</Text>
            </TouchableOpacity>
        </View>

      </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginRight: 170 ,
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 24,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset:{width:0, height:5},
    elevation: 5,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileUsername: {
    color: '#666',
    marginTop: 5,
  },
  profileLocation: {
    color: '#666',
    marginTop: 5,
  },
  profileDescription: {
    color: '#666',
    marginTop: 10,
  },
  editButton: {
    padding: 5,
  },
  editButtonText: {
    color: '#f28b54', // Adjust color as needed
    fontSize: 18,
  },
  optionButton: {
    flexDirection:'row',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 24,
    marginBottom:24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset:{height:5},
    elevation: 5,
  },
  optionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  deleteButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#E04530',
  },
  icon: {
    paddingRight:24
  }
});

export default settingBP;
