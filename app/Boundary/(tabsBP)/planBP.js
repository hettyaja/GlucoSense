import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DietPlanCard from '../DietPlanCard';
import { Tabs, useRouter } from 'expo-router';
import ViewDietPlanController from '../../Controller/ViewDietPlanController';
import Header from '../../components/Header';
import DeleteDietPlanController from '../../Controller/DeleteDietPlanController';
import { useAuth } from '../../service/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { encode as btoa } from 'base-64';
 
const planBP = () => {
  const { user } = useAuth()
  const [ dietPlans, setDietPlans] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  

  const fetchDietPlans = async () => {
    try {
      const dietPlansData = await ViewDietPlanController.fetchDietPlans(user.uid);
      setDietPlans(dietPlansData);
    } catch (error) {
      console.error("Error fetching diet plans: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDietPlans();
    }
  }, [user]);

  const handleEdit = (dietPlan) => {
    console.log('before', dietPlan);
    const encodedDietPlan = btoa(JSON.stringify(dietPlan));
    router.push({
      pathname: '/Boundary/EditDietPlan',
      params: { dietPlanData: encodedDietPlan },
    });
  };
  

  const handleDelete = async (dietPlanId) => {
    await DeleteDietPlanController.deleteDietPlan(user.uid, dietPlanId)
    fetchDietPlans()
  }

  const filteredDietPlans = dietPlans.filter((dietPlan) =>
  dietPlan.planName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Header
        title="Diet Plan"
        rightButton="Add"
        onRightButtonPress={() => router.push('/Boundary/CreateDietPlanUI')}
      />
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <FontAwesome name="search" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Search menu"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
          <View style={styles.cardContainer}>
          {filteredDietPlans.map((dietPlan) => (
          <DietPlanCard key={dietPlan.id} dietPlan={dietPlan} onEdit={() => handleEdit(dietPlan)} onDelete={handleDelete} />
        ))}
          </View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  searchContainer: {
    backgroundColor: 'white',
    marginBottom:16
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    color: '#333',
  },
  cardContainer: {
    paddingHorizontal:16
  }
});

export default planBP;
