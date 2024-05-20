import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingPage({ navigation, route }) {
  const { profile } = route.params || {};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/rectangle.png')}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Setting</Text>
      </ImageBackground>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { profile })}>
          <View style={styles.profileTop}>
            {profile?.image ? (
              <Image source={{ uri: profile.image }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder} />
            )}
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>{profile?.shopName}</Text>
              <Text style={styles.profileUsername}>@{profile?.username}</Text>
              <Text style={styles.profileLocation}>{profile?.shopAddress}</Text>
              <Text style={styles.profileDescription}>{profile?.description}</Text>
            </View>
            <Icon name="pencil" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.menuItemText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ReportProblem')}>
          <Text style={styles.menuItemText}>Report problem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.deleteAccount]}>
          <Text style={styles.menuItemText}>Delete business account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headerImage: {
    resizeMode: 'cover',
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    padding: 16,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    marginRight: 16,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileUsername: {
    color: 'gray',
  },
  profileLocation: {
    color: 'gray',
  },
  profileDescription: {
    color: 'gray',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
  deleteAccount: {
    backgroundColor: '#ffdddd',
  },
});
