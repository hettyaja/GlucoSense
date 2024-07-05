import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import React, { useEffect } from 'react';
import { Link, Redirect, router } from 'expo-router';
import { useAuth } from './service/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });


const Index = () => {
  const { resetAuth } = useAuth();

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('Permission to access notifications was denied');
  //     }
  //   };
  //   requestPermissions();
  // }, []);

  // const triggerTestNotification = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Test Notification",
  //       body: "This is a test notification to verify your setup.",
  //     },
  //     trigger: { seconds: 1 },
  //   });
  // };


  const clearAsync = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    // <Redirect href="home" />
    <View style={styles.container}>
      <Button title="Clear Storage" onPress={clearAsync} />
      {/* <Button title="Trigger Test Notification" onPress={triggerTestNotification} /> */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Index;
