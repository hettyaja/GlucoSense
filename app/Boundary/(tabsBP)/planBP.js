import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { DietPlanContext } from '../../context/DietPlanContext';
import DietPlanCard from '../../DietPlanCard';
import Calendar from '../../Calendar';
import moment from 'moment';
import { Tabs, useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const planBP = () => {
  const { dietPlans, setDietPlans, removeDietPlan } = useContext(DietPlanContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
          const dietPlanCollection = collection(db, `businessPartner/${userId}/dietplan`);
          const dietPlanSnapshot = await getDocs(dietPlanCollection);
          const dietPlansData = dietPlanSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            meals: doc.data().meals || { lunch: {}, dinner: {} },
          }));
          setDietPlans(dietPlansData);
        } catch (error) {
          console.error("Error fetching diet plans: ", error);
        }
      };

      fetchData();
    }
  }, [userId, setDietPlans]);

  const handleConfirm = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`;
    }
    return 'Select date range';
  };

  const handleEdit = (dietPlan) => {
    router.push({
      pathname: '/EditDietPlan',
      params: { dietPlan: JSON.stringify(dietPlan), userId },
    });
  };

  return (
    <>
      <Tabs.Screen options={{
        title: 'Diet Plan',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerTitle: 'Diet Plan',
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('/CreateDietPlan')} style={{ marginRight: 16 }}>
            <MaterialIcons name='add' size={32} color='white'/>
          </TouchableOpacity>
        )
      }}/>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search & Filter" />
        </View>
        <Calendar onConfirm={handleConfirm} />
        {dietPlans.map((dietPlan) => (
          <DietPlanCard key={dietPlan.id} dietPlan={dietPlan} onEdit={handleEdit} onDelete={removeDietPlan} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  searchContainer: { marginTop: 20 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 15, paddingHorizontal: 10, height: 40 },
});

export default planBP;
