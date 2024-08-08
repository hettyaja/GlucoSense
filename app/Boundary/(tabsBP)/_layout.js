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
        <Tabs.Screen name='OrderBP' options={{
          title: 'Food Order',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#E58B68" />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', fontSize:10, color: '#E58B68' }}>
              Order
            </Text>
          ),
        }} />
        <Tabs.Screen name='foodBP' options={{
          title: 'Food',
          tabBarIcon: () => (
            <FontAwesome name='cutlery' size={20} color='#E58B68' />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', fontSize:10, color: '#E58B68' }}>
              Food
            </Text>
          ),
        }} />
        <Tabs.Screen name='planBP' options={{
          title: 'Plan',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#E58B68" />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', fontSize:10, color: '#E58B68' }}>
              Plan
            </Text>
          ),
        }} />
        <Tabs.Screen name='settingBP' options={{
          title: 'Setting',
          tabBarIcon: () => (
            <AntDesign name='setting' size={20} color='#E58B68' />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', fontSize:10, color: '#E58B68' }}>
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
