import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, router } from 'expo-router';
import { useAuth } from './service/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from './constants/images';

const Index = () => {

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <Text style={styles.titleText}>GlucoSense</Text>
      <ActivityIndicator size="large" color="#E58B68" style={styles.loadingIndicator} />
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
  logo: {
    width: 200,
    height: 200,
    marginTop: 70,
  },
  titleText: {
    fontFamily: 'Poppins-Black',
    fontSize: 48,
    color: '#E58B68',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 40,
  },
});

export default Index;
