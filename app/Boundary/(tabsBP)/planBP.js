import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { DietPlanContext } from '../../context/DietPlanContext';
import DietPlanCard from '../../DietPlanCard';
import Calendar from '../../Calendar';
import moment from 'moment';
import { Tabs, useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const planBP = () => {
  const { dietPlans } = useContext(DietPlanContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();

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
          <DietPlanCard key={dietPlan.id} dietPlan={dietPlan} />
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
