import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import { useAuth } from './context/authContext';

const Index = () => {
  // const { isAuthenticated, userType } = useAuth();
  // console.log(isAuthenticated);

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
  // } else {
  //   return <Redirect href="getStartedPage_1" />;
  // }

  return (
    <View style={styles.container}>
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
