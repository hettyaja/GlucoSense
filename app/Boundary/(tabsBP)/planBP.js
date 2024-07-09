import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DietPlanContext } from '../../context/DietPlanContext';
import DietPlanCard from '../../DietPlanCard';
import Calendar from '../../Calendar';
import moment from 'moment';
import { Tabs, router } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const planBP = () => {
  const { dietPlans } = useContext(DietPlanContext);
  const navigation = useNavigation();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleCreateDietPlan = () => {
    navigation.navigate('CreateDietPlan');
  };

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
          <TouchableOpacity onPress={() => router.push('CreateDietPlan')} style={{marginRight:16}}>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F28B54', paddingVertical: 10, paddingHorizontal: 15 },
  icon: { width: 24, height: 24 },
  title: { fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' },
  searchContainer: { marginTop: 20 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 15, paddingHorizontal: 10, height: 40 },
});

export default planBP;
