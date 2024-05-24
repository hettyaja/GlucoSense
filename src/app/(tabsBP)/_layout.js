import { useState } from 'react';
import {React, Image, View, Modal, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { router, Stack, Tabs } from 'expo-router'
import { useFonts } from 'expo-font'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SimpleLineIcons } from '@expo/vector-icons';
import { images } from '../../constants/images';
import BottomSheetModal from '../(tabs)/add';
import ImageButton from '../../components/ImageButton';
import { BPProfileProvider } from '../context/BPProfileContext';

const _layout = () => {
  return (
    <>
        <Tabs>
            <Tabs.Screen name='homeBP' options={{
                title:'Home',
                headerShown:false,
                tabBarIcon: () => (
                    <Octicons name='home' size={24} color='#E58B68'/>
                ),
                tabBarLabel: ({ focused }) => (
                  <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                      Home
                  </Text>
              ),
            }}/>
            <Tabs.Screen name='settingBP' options={{
                title: 'Setting',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#E58B68' },
                headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
                tabBarIcon: () => (
                    <AntDesign name='setting' size={24} color='#E58B68'/>
                ),
                tabBarLabel: ({ focused }) => (
                  <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                      Setting
                  </Text>
              ),
            }}/>
        </Tabs>
    </>
  );
};

export default _layout

const styles = StyleSheet.create({})