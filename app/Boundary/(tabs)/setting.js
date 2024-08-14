import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { router, Tabs, useFocusEffect } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LogoutController from '../../Controller/LogoutController';
import { useAuth } from '../../service/AuthContext';
import DeleteUserController from '../../Controller/DeleteUserController';
import getProfileController from '../../Controller/getProfileController';
import setSubscribedController from '../../Controller/setSubscibedController';

const Setting = () => {
  const { user } = useAuth();
  const [photoUri, setPhotoUri] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Modal visibility state

  const fetchProfileData = async () => {
    try {
      const profileData = await getProfileController.getProfile(user.uid);
      setPhotoUri(profileData.photoUri);
      setSubscriptionType(profileData.subscriptionType);
      setName(profileData.name);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user.uid) {
        fetchProfileData();
      }
    }, [user.uid])
  );

  const handleSignOut = async () => {
    await LogoutController.logout();
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true); // Start loading
    try {
      await DeleteUserController.deleteUser(user.uid);
      router.replace('Boundary/welcomePage');
    } catch (error) {
      console.error('Error deleting user profile:', error);
    } finally {
      setIsLoading(false); // End loading
      setIsDeleteModalVisible(false); // Close the modal
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const createSubTwoButtonAlert = () =>
    Alert.alert('Cancel Subscription', 'Are you sure you want to cancel your subscription?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await setSubscribedController.setSubbed(user.uid, 'free');
            setSubscriptionType('free');
          } catch (error) {
            console.error('Error cancelling subscription:', error);
          }
        },
      },
    ]);

  return (
    <>
      <Tabs.Screen
        options={{
          title: 'Setting',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Medium', fontSize: 16 },
          headerRight: () =>
            subscriptionType !== 'premium' ? (
              <TouchableOpacity onPress={() => router.push('Boundary/Subscribe')}>
                <Text style={{ paddingHorizontal: 16, fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white' }}>
                  Upgrade
                </Text>
              </TouchableOpacity>
            ) : null,
          headerTitle: 'Setting',
          headerTitleAlign: 'center',
        }}
      />

      <ScrollView style={styles.safeArea}>
        <TouchableOpacity
          style={[styles.profileCard, Platform.OS === 'ios' && styles.shadow]}
          onPress={() => router.push('Boundary/ProfileUI')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 24 }}>
            {photoUri ? (
              <Image style={styles.profileImage} source={{ uri: photoUri }} />
            ) : (
              <FontAwesome name="user-circle" color="grey" size={64} style={{marginRight:16}} />
            )}

            <View>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>{name}</Text>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                {subscriptionType === 'premium' ? 'Premium User' : 'Free User'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('Boundary/connectBluetooth')}>
            <MaterialCommunityIcons name="bluetooth-connect" size={24} color="#000" />
            <Text style={styles.buttonText}>Connect glucose meter</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }} />
          <TouchableOpacity style={styles.button} onPress={() => router.push('Boundary/ExportReportUserUI')}>
            <MaterialIcons name="bar-chart" size={24} />
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }} />
          <TouchableOpacity style={styles.button} onPress={() => router.push('reminder')}>
            <MaterialCommunityIcons name="bell-outline" size={24} />
            <Text style={styles.buttonText}>Reminder</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }} />
          <TouchableOpacity style={styles.button} onPress={() => router.push('Boundary/Goals')}>
            <MaterialIcons name="flag" size={24} />
            <Text style={styles.buttonText}>Goals</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }} />
          <TouchableOpacity style={styles.button} onPress={() => router.push('Boundary/PaymentMethod')}>
            <MaterialIcons name="payment" size={24} />
            <Text style={styles.buttonText}>Payments</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }} />
          <TouchableOpacity style={styles.button} onPress={() => router.push('Boundary/ManageAddress')}>
            <MaterialCommunityIcons name="map-marker-radius-outline" size={24} />
            <Text style={styles.buttonText}>Address</Text>
          </TouchableOpacity>
          {subscriptionType === 'premium' && (
            <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }} />
          )}
          {subscriptionType === 'premium' && (
            <TouchableOpacity style={styles.button} onPress={createSubTwoButtonAlert}>
              <MaterialCommunityIcons name="cancel" size={24} />
              <Text style={styles.buttonText}>Cancel Subscription</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('ReportProblem')}>
            <FontAwesome name="question-circle" size={24}/>
            <Text style={styles.buttonText}>Help & Feedback</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={openDeleteModal}>
            <AntDesign name="deleteuser" size={24} />
            <Text style={styles.buttonText}>Delete account</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }} />
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <MaterialIcons name="logout" size={24}/>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Custom Modal for Delete Account */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isDeleteModalVisible}
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete account</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete your account?</Text>

            {isLoading ? (
              <ActivityIndicator size="large" color="#E58B68" />
            ) : (
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, {borderWidth:1, borderColor:'#E58B68'}]} onPress={closeDeleteModal}>
                  <Text style={[styles.modalButtonText, { color: '#E58B68'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#E58B68' }]} onPress={handleDeleteAccount}>
                  <Text style={[styles.modalButtonText, { color: 'white' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 16,
    marginVertical: 24,
    borderRadius: 8,
    elevation: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    borderRadius: 100,
    borderColor: 'black',
    width: 64,
    height: 64,
    marginRight: 16,
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  modalMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
});
