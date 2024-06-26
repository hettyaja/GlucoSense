import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import React from 'react';
import { Link, Redirect, router } from 'expo-router';
import { useAuth } from './context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const { isAuthenticated, userType, resetAuth } = useAuth();
  console.log(isAuthenticated);

  // if (isAuthenticated === undefined) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  // if (isAuthenticated) {
  //   if (userType === 'free') {
  //     return <Redirect href="home" />;
  //   } else if (userType === 'business') {
  //     return <Redirect href="homeBP" />;
  //   }
  // } else if (isAuthenticated == false) {
  //   return <Redirect href="getStartedPage_1" />;
  // }

  const clearAsync = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
      resetAuth(); // Optionally reset the auth state
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    // <Redirect href="home" />
    <View style={styles.container}>
      <Button title="Clear Storage" onPress={clearAsync} />
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
