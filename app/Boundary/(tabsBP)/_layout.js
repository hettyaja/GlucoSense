import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const _layout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name='homeBP' options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: () => (
            <Octicons name='home' size={24} color='#E58B68' />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Home
            </Text>
          ),
        }} />
        <Tabs.Screen name='OrderBP' options={{
          title: 'Food Order',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
          tabBarIcon: () => (
            <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#E58B68" />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Order
            </Text>
          ),
        }} />
        <Tabs.Screen name='foodBP' options={{
          title: 'Food',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
          tabBarIcon: () => (
            <FontAwesome name='cutlery' size={24} color='#E58B68' />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Food
            </Text>
          ),
        }} />
        <Tabs.Screen name='planBP' options={{
          title: 'Plan',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
          tabBarIcon: () => (
            <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#E58B68" />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Plan
            </Text>
          ),
        }} />
        <Tabs.Screen name='settingBP' options={{
          title: 'Setting',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
          tabBarIcon: () => (
            <AntDesign name='setting' size={24} color='#E58B68' />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Setting
            </Text>
          ),
        }} />
      </Tabs>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
