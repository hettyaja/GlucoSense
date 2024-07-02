import React from 'react';
import { Text } from 'react-native'
import { Tabs, Stack } from 'expo-router';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='insightSA' options={{
        headerShown:false,
        title:'Insight',
        tabBarIcon: () => (
          <SimpleLineIcons name='graph' size={24} color='#E58B68'/>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Insight
          </Text>
        ),
      }}/>
      
      <Tabs.Screen name='userSA' options={{
        headerShown:false,
        title:'Users',
        tabBarIcon: () => (
          <Feather name='user' size={24} color='#E58B68'/>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Users
          </Text>
        ),
      }}/>
      <Tabs.Screen name='partnerSA' options={{
        headerShown:false,
        title:'Partners',
        tabBarIcon: () => (
          <Ionicons name='storefront-outline' size={24} color='#E58B68'/>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Partners
          </Text>
        ),
        }}/>
      <Tabs.Screen name='settingSA' options={{
        headerShown:false,
        title:'Setting',
        tabBarIcon: () => (
          <AntDesign name='setting' size={24} color='#E58B68'/>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
              Users
          </Text>
        ),
        }} />
    </Tabs>
  );
};

export default _layout;
