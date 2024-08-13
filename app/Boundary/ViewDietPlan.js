import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';
import { useAuth } from '../service/AuthContext';
import ViewDietPlanController from '../Controller/ViewDietPlanController';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ViewDietPlan = () => {
  const { user } = useAuth();
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredDietPlans = dietPlans.filter(plan =>
    plan.planName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        title='Diet Plan'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Search diet plan"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#E58B68" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {filteredDietPlans.map(plan => (
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 11,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scrollViewContent: {
    padding: 20,
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
  planName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  planPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
});

export default ViewDietPlan;
