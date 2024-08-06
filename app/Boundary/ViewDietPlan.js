import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';

const dietPlans = [
  {
    id: '1',
    title: 'Weight Loss Program (7 Days)',
    description: 'Lunch & Dinner',
    price: '49.90',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Weight Loss Program (30 Days)',
    description: 'Lunch & Dinner',
    price: '99.90',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Diabetes Program (7 Days)',
    description: 'Lunch & Dinner',
    price: '49.90',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Diabetes Program (30 Days)',
    description: 'Lunch & Dinner',
    price: '99.90',
    image: 'https://via.placeholder.com/150',
  },
];

const ViewDietPlan = () => {
  return (
    <>
      <Header
        title='Diet Plan'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {dietPlans.map(plan => (
            <View key={plan.id} style={styles.planCard}>
              <Image source={{ uri: plan.image }} style={styles.planImage} />
              <View style={styles.planInfo}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
                <Text style={styles.planPrice}>S$ {plan.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 16,
  },
  planCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  planImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  planInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  planTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  planDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  planPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
});

export default ViewDietPlan;
