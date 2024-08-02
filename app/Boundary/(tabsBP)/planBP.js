import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { DietPlanContext } from '../../context/DietPlanContext';
import DietPlanCard from '../DietPlanCard';
import Calendar from '../../Calendar';
import moment from 'moment';
import { Tabs, useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import ViewDietPlanController from '../../Controller/ViewDietPlanController';
import Header from '../../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto'
import DeleteDietPlanController from '../../Controller/DeleteDietPlanController';
import { useAuth } from '../../service/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
 
const planBP = () => {
  const { user } = useAuth()
  const { userId } = useState(user.uid)
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
    router.push({
      pathname: '/Boundary/EditDietPlan',
      params: { dietPlan: JSON.stringify(dietPlan), userId},
    });
  };

  const handleDelete = async (dietPlanId) => {
    await DeleteDietPlanController.deleteDietPlan(user.uid, dietPlanId)
    fetchDietPlans()
  }

  const filteredDietPlans = dietPlans.filter((dietPlan) =>
  dietPlan.planName.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <>
      <Header
        title="Diet Plan"
        rightButton="Add"
        onRightButtonPress={() => router.push('/Boundary/CreateDietPlan')}
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
          <DietPlanCard key={dietPlan.id} dietPlan={dietPlan} onEdit={handleEdit} onDelete={handleDelete} />
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
