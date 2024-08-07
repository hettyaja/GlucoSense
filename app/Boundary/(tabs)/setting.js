
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
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

  const fetchProfileData = async () => {
    try {
      const profileData = await getProfileController.getProfile(user.uid);
      setPhotoUri(profileData.image);
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
            await DeleteUserController.deleteUser(user.uid);
            router.replace('Boundary/welcomePage');
          } catch (error) {
            console.error('Error deleting user profile:', error);
          }
        },
      },
    ]);

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
          onPress={() => router.push('profile')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 24 }}>
            {photoUri ? (
              <Image style={styles.profileImage} source={{ uri: photoUri }} />
            ) : (
              <FontAwesome name="user-circle" color="grey" size={64} style={styles.icon} />
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
          <TouchableOpacity style={styles.button} onPress={createTwoButtonAlert}>
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
  iconImage: {
    width: 32,
    height: 32,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    alignItems: 'center',
    margin: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    width: '98%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
