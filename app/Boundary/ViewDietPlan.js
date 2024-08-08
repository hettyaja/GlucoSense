import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';
import { useAuth } from '../service/AuthContext';
import ViewDietPlanController from '../Controller/ViewDietPlanController';

const ViewDietPlan = () => {
  const { user } = useAuth();
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDietPlans = async () => {
    try {
      const dietPlansData = await ViewDietPlanController.fetchAllDietPlans();
      setDietPlans(dietPlansData);
      
    } catch (error) {
      console.error("Error fetching diet plans: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDietPlans();
    }
  }, [user]);

  return (
    <>
      <Header
        title='Diet Plan'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#E58B68" />
        ) : (
          <ScrollView style={styles.scrollViewContent}>
            {dietPlans.map(plan => (
              <TouchableOpacity key={plan.id} style={styles.planCard}>
                <Image source={{ uri: plan.planImage }} style={styles.planImage} />
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.planName}</Text>
                  <Text style={styles.planPrice}>S$ {plan.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding:16
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
  },
  planTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  planDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  planPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
});

export default ViewDietPlan;
