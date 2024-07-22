import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FoodOrderBP from '../../Boundary/FoodOrderBP';
import DietPlanOrderBP from '../../Boundary/DietPlanOrderBP';

const Tab = createMaterialTopTabNavigator();

const OrderBP = () => {
  return (
    <SafeAreaView style={styles.container}>
          <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 14, fontWeight: 'bold' },
          style: { backgroundColor: '#E58B68' },
          indicatorStyle: { backgroundColor: 'white' },
          activeTintColor: 'white',
          inactiveTintColor: '#FFDBB6',
        }}
      >
        <Tab.Screen name="Food Order" component={FoodOrderBP} />
        <Tab.Screen name="Diet Plan Order" component={DietPlanOrderBP} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#E58B68',
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderBP;
