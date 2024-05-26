import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DietPlanContext } from '../app/context/DietPlanContext';
import DietPlanCard from '../app/DietPlanCard';
import Calendar from '../app/Calendar';
import moment from 'moment';

const ViewAndSearchDietPlan = () => {
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/X.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Diet Plan</Text>
        {/* <TouchableOpacity onPress={handleCreateDietPlan}>
          <Image source={require('../assests/+.png')} style={styles.icon} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search & Filter" />
      </View>
      <Calendar onConfirm={handleConfirm} />
      {dietPlans.map((dietPlan) => (
        <DietPlanCard key={dietPlan.id} dietPlan={dietPlan} />
      ))}
    </ScrollView>
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

export default ViewAndSearchDietPlan;
