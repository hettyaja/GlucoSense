// settingBP.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { useBPProfile } from '../context/BPProfileContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useAuth } from '../context/authContext';


const settingBP = () => {
    const { logout, deleteUser, user } = useAuth();
    const uid = user.uid;

    const router = useRouter();
    const { BPProfileData } = useBPProfile();

    const handleSignOut = async () => {
      await logout()
    }
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
            await deleteUser(uid, 'businessPartner');  
            router.push('welcomePage');    
          } catch (error) {
            console.error('Error deleting user profile:', error);
            alert('Error deleting user profile: ' + error.message);
          }
        },
      },
    ]);


    return (
      <>
        <View style={styles.container}>
            {/* Profile Card Section */}
            <TouchableOpacity onPress={() => router.push('/profileBP')}>
            <View style={styles.profileCard}>
                <Image 
                    source={{ uri: BPProfileData.photoUri || 'photoUri'}} // Use actual photo URI
                    style={styles.profilePhoto}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{BPProfileData.shopName || 'Shop Name'}</Text>
                    <Text style={styles.profileUsername}>{BPProfileData.username || 'Username'}</Text>
                    <Text style={styles.profileLocation}>{BPProfileData.location || 'Location'}</Text>
                    <Text style={styles.profileDescription}>{BPProfileData.description || 'Description'}</Text>
                </View>
               
                <FontAwesome name='angle-right' size={24} color="#00000"/> 

            </View>
            </TouchableOpacity>

            {/* Settings Options */}
            <TouchableOpacity style={styles.optionButton} onPress={()=> router.push('Notification')}>
                <MaterialCommunityIcons name='bell-outline' size={24} style={styles.icon}/>
                <Text style={styles.optionButtonText}>Notification</Text>
                
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/ReportProblem')}>
              <Octicons name='report' size={24} style={styles.icon}/>
                <Text style={styles.optionButtonText}>Report problem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleSignOut()}>
                <MaterialIcons name='logout' size={24} style={styles.icon}/>
                <Text style={styles.optionButtonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress = {() => createTwoButtonAlert()}>
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
