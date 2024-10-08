import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Stack } from 'expo-router';
import { useAuth } from '../service/AuthContext';

const Header = ({ title, leftButton, onLeftButtonPress, rightButton, onRightButtonPress, headerShown, transparent, leftButtonColor }) => {
  const { user } = useAuth();

  const renderLeftButton = () => {
    const color = leftButtonColor || 'white';

    switch (leftButton) {
      case 'Back':
        return (
          <TouchableOpacity onPress={onLeftButtonPress}>
            <Ionicons name='chevron-back' size={24} color={color} />
          </TouchableOpacity>
        );
      case 'Close':
        return (
          <TouchableOpacity onPress={onLeftButtonPress}>
            <AntDesign name='close' size={24} color={color} />
          </TouchableOpacity>
        );
      case 'Home':
        return (
          <View style={{ flexDirection: 'row', marginLeft: 16 }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color }}>Welcome, </Text>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color }}>{user.username}</Text>
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
      case 'Add':
        return (
          <TouchableOpacity onPress={onRightButtonPress} style={{marginRight:16}}>
            <Feather name='plus' size={24} color='white' />
          </TouchableOpacity>
        );
      case 'Notification':
        return (
          <TouchableOpacity style={{ marginRight: 16 }} onPress={onRightButtonPress}>
            <MaterialCommunityIcons name='bell-outline' size={24} color='white' />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <Stack.Screen
      options={{
        title: title,
        headerShown: headerShown,
        headerStyle: transparent ? {} : { backgroundColor: '#E58B68' },
        headerTitleStyle: transparent ? {} : { color: 'white', fontFamily: 'Poppins-Medium', fontSize: 16 },
        headerLeft: renderLeftButton,
        headerRight: renderRightButton,
        headerTitleAlign: 'center',
        headerTransparent: transparent,
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
