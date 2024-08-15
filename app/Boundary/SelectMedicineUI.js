import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../service/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import PopupMenu from '../components/PopupMenu';
import Header from '../components/Header';
import { router } from 'expo-router';
import Divider from '../components/Divider';
import ViewMedListController from '../Controller/ViewMedListController';
import DeleteMedListController from '../Controller/DeleteMedListController';

const selectMedicine = () => {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicinesName, setSelectedMedicinesName] = useState({});

  const fetchMedicines = async () => {
    if (user) {
      try {
        const medicinesList = await ViewMedListController.viewMedicineList(user.uid);
        setMedicines(medicinesList);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMedicines();
    }, [user])
  );
  


  const toggleMedicineSelection = (id, name) => {
    setSelectedMedicinesName((prevState) => {
      const newState = { ...prevState };
      if (newState[id]) {
        delete newState[id];
      } else {
        newState[id] = name;
      }
      return newState;
    });
  };

  const saveMeds = () => {
    // Get the selected medicine names
    const selectedMedicineNames = Object.values(selectedMedicinesName);
    console.log(selectedMedicineNames);
    // Navigate to the 'addMeds' page with selected medicine names
    router.push({ pathname: 'Boundary/AddMedsUI', params: { selectedMedicineNames: JSON.stringify(selectedMedicineNames) } });
  };

  const handleBackPress = () => {
    router.back(); // Default back action
  };

  const handleEdit = (medicine) => {
    router.push({ pathname: 'Boundary/UpdateMedListUI', params: { medData: JSON.stringify(medicine) } });
  }

  const confirmDelete = (medicine) => {
    Alert.alert(
      "Delete Medicine",
      "Are you sure you want to delete this medicine?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => handleDelete(medicine) }
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (medicine) => {
    await DeleteMedListController.deleteMedList(user.uid, medicine)
    fetchMedicines();
  }

  return (
    <>
      <Header
        title='Select meds'
        leftButton='Back'
        onLeftButtonPress={handleBackPress}
        rightButton='Save'
        onRightButtonPress={() => saveMeds()}
      />
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        {medicines.map((medicine, index) => (
          <View key={medicine.id}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleMedicineSelection(medicine.id, medicine.medicineName)}
            >
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={selectedMedicinesName[medicine.id] !== undefined}
                  onValueChange={() => toggleMedicineSelection(medicine.id, medicine.medicineName)}
                  style={styles.checkbox}
                  color='#E58B68'
                />
                <View style={styles.textContainer}>
                  <Text style={styles.medicineName}>{medicine.medicineName}</Text>
                  <Text style={styles.unit}>{medicine.unit}</Text>
                </View>
              </View>
              <PopupMenu onEdit={() => handleEdit(medicine)} onDelete={() => confirmDelete(medicine)} />
            </TouchableOpacity>
            {index < medicines.length - 1 && <Divider withMargin={false} />}
          </View>
        ))}

        <TouchableOpacity style={styles.createButton} onPress={() => router.push('Boundary/CreateMedListUI')}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>Create medicine</Text>
          <Ionicons name='chevron-forward' size={24} color='black' />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default selectMedicine;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 20, // Example style, you can customize as needed
    borderColor: '#E58B68',
    borderWidth: 1,
  },
  textContainer: {
    marginLeft: 10,
  },
  medicineName: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    paddingTop: 10,
    paddingLeft: 10,
  },
  unit: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    
  },
  createButton: {
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'#808080',
    borderBottomWidth:0.5,
    borderTopWidth:0.5
  },
});
