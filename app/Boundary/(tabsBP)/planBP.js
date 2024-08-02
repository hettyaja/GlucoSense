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

const planBP = () => {
  const { dietPlans, setDietPlans, removeDietPlan } = useContext(DietPlanContext);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const dietPlansData = await ViewDietPlanController.fetchDietPlans(userId);
          setDietPlans(dietPlansData);
        } catch (error) {
          console.error("Error fetching diet plans: ", error);
        }
      };

      fetchData();
    }
  }, [userId, setDietPlans]);

  const handleEdit = (dietPlan) => {
    router.push({
      pathname: '/Boundary/EditDietPlan',
      params: { dietPlan: JSON.stringify(dietPlan), userId },
    });
  };

  return (
    <>
      <Header
        title="Diet Plan"
        rightButton="Add"
        onRightButtonPress={() => router.push('/Boundary/CreateDietPlan')}
      />
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search & Filter" />
        </View>
        {dietPlans.map((dietPlan) => (
          <DietPlanCard key={dietPlan.id} dietPlan={dietPlan} onEdit={handleEdit} onDelete={removeDietPlan} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  searchContainer: {
  },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 15, paddingHorizontal: 10, height: 40 },
});

export default planBP;
