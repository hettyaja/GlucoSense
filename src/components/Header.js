import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Stack } from 'expo-router';
import { useAuth } from '../app/context/authContext';

const Header = ({ title, leftButton, onLeftButtonPress, rightButton, onRightButtonPress}) => {
    const { username } = useAuth()
  const renderLeftButton = () => {
    switch (leftButton) {
      case 'Back':
        return (
          <TouchableOpacity onPress={onLeftButtonPress}>
            <Ionicons name='chevron-back' size={24} color='white' />
          </TouchableOpacity>
        );
      case 'Close':
        return (
          <TouchableOpacity onPress={onLeftButtonPress}>
            <AntDesign name='close' size={24} color='white' />
          </TouchableOpacity>
        );
      case 'Home':
        return (
          <View style={{ flexDirection: 'row', marginLeft: 16 }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'white' }}>Welcome, </Text>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>{username}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderRightButton = () => {
    switch (rightButton) {
      case 'Save':
        return (
            <TouchableOpacity onPress={onRightButtonPress}>
                <Text style={styles.rightButton}>{rightButton}</Text>
            </TouchableOpacity>
        );
      case 'Edit':
        return (
            <TouchableOpacity onPress={onRightButtonPress}>
                <Text style={styles.rightButton}>{rightButton}</Text>
            </TouchableOpacity>
        );
    case 'Notification':
        return (
        <TouchableOpacity style={{marginRight:16}} onPress={onRightButtonPress}>
            <MaterialCommunityIcons name='bell-outline' size={24} color='white'/>
          </TouchableOpacity>
        )
      default:
        return null;
    }
  };

  return (
    <Stack.Screen
      options={{
        title: title,
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: renderLeftButton,
        headerRight: renderRightButton,
        headerTitleAlign: 'center',
      }}
    />
  );
};

const styles = StyleSheet.create({
  rightButton: {
    marginHorizontal: 8,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});

export default Header;
