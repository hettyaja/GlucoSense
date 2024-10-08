import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import LogoutController from '../../Controller/LogoutController';
import Header from '../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAuth } from '../../service/AuthContext';


const SettingSA = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await LogoutController.logout();
  };

  const handleExportReport = () => {
    router.push('Boundary/exportReportSA');
  };

  const handleProfile = () => {
    router.push('Boundary/SystemAdminProfileUI')
  };

  return (
    <>
    <Header
      title="Setting"
    />
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={handleProfile}>
          <MaterialIcons name="account-circle" size={24}/>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

      <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
        <TouchableOpacity style={styles.button} onPress={handleExportReport}>
          <MaterialIcons name="bar-chart" size={24}/>
          <Text style={styles.buttonText}>Export Report</Text>
        </TouchableOpacity>

        <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <MaterialIcons name='logout' size={24} style={styles.icon}/>
          <Text style={styles.buttonText}>Log out</Text>
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
  profileCard: {
    backgroundColor:'white',
    flexDirection:'row',
    margin:16,
    marginVertical:24,
    borderRadius:8,
    elevation:4
  },
  profileImage: {
    borderRadius:100,
    borderColor:'black',
    width:64,
    height:64,
    marginRight:16
  },
  section: {
    backgroundColor:'white',
    marginBottom:24,
    paddingHorizontal:16
  },
  button: {
    padding:8,
    flexDirection:'row',
    alignItems:'center'
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize:16,
    marginLeft:16
  },
});

export default SettingSA;
