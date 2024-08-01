import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { router } from 'expo-router';
import ViewProfileAdminController from '../Controller/ViewProfileAdminController';
import { useAuth } from '../service/AuthContext';

const SystemAdminProfileUI = () => {
  const { user } = useAuth();
  const uid = user.uid;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getAdminProfile = async () => {
      if (uid) {
        try {
          const data = await ViewProfileAdminController.viewProfileAdmin(uid);
          if (data) {
            setName(data.name || 'System Admin');
            setEmail(data.email || 'email@gmail.com');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };
    getAdminProfile();
  }, [uid]);

  return (
    <>
      <Header
        title='Profile'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />

      <View style={styles.container}>
        <View style={styles.profileItem}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
    </>
  );
}

export default SystemAdminProfileUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});
