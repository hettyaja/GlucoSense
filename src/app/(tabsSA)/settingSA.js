import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/authContext';
import { useRouter } from 'expo-router';
import Divider from '../components/Divider'; // Adjust the import path according to your project structure

const SettingSA = () => {
  const { logout } = useAuth();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await logout();
  };

  const handleExportReport = () => {
    router.push('exportReport');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Setting</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual profile image URL
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Agustianto Jusuf Kalla</Text>
          <Text style={styles.profileRole}>System Admin</Text>
        </View>
      </View>
      <Divider withMargin />
      <TouchableOpacity style={styles.optionContainer} onPress={handleExportReport}>
        <Text style={styles.optionText}>Export Report</Text>
      </TouchableOpacity>
      <Divider withMargin />
      <TouchableOpacity style={styles.optionContainer} onPress={handleSignOut}>
        <Text style={styles.optionText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#D9A37E',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
  },
});

export default SettingSA;
