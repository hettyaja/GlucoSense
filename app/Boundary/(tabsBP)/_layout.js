import { useState } from 'react';
import {React, Image, View, Modal, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { router, Stack, Tabs } from 'expo-router'
import { useFonts } from 'expo-font'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
            <Tabs.Screen name='foodBP' options={{
                title: 'Food',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#E58B68' },
                headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
                tabBarIcon: () => (
                    <AntDesign name='setting' size={24} color='#E58B68'/>
                ),
                tabBarLabel: ({ focused }) => (
                  <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                      Food
                  </Text>
              ),
            }}/>
            <Tabs.Screen name='planBP' options={{
                title: 'Plan',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#E58B68' },
                headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#E58B68" />
                 
                ),
                tabBarLabel: ({ focused }) => (
                  <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                      Plan
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
