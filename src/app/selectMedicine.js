import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMedicine } from './service/diaryService';
import { useAuth } from './context/authContext';
import Checkbox from 'expo-checkbox';
import PopupMenu from '../components/PopupMenu';
import Header from '../components/Header';
import { router } from 'expo-router';
import Divider from '../components/Divider';

const selectMedicine = () => {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState({});

  useEffect(() => {
    const fetchMedicines = async () => {
      if (user) {
        try {
          const medicinesList = await getMedicine(user.uid);
          setMedicines(medicinesList);
        } catch (error) {
          console.error('Error fetching medicines:', error);
        }
      }
    };
    fetchMedicines();
  }, [user]);

  const toggleMedicineSelection = (id) => {
    setSelectedMedicines((prevState) => {
      const newState = { ...prevState };
      if (newState[id]) {
        delete newState[id];
      } else {
        newState[id] = true;
      }
      return newState;
    });
  };

  const saveMeds = () => {
    // Get the selected medicine IDs
    const selectedMedicineIds = Object.keys(selectedMedicines).filter(key => selectedMedicines[key]);
    console.log(selectedMedicineIds)
    // Navigate to the 'addMeds' page with selected medicine IDs
    router.push({ pathname: 'addMeds', params: { selectedMedicineIds: JSON.stringify(selectedMedicineIds) } });
  };

  const handleBackPress = () => {
    router.back(); // Default back action
  };

  return (
    <>
      <Header
        title='Select meds'
        leftButton='Back'
        onLeftButtonPress={handleBackPress}
        rightButton='Save'
        onRightButtonPress={saveMeds}
      />
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        {medicines.map((medicine, index) => (
          <View>
          <TouchableOpacity
            key={medicine.id}
            style={styles.button}
            onPress={() => toggleMedicineSelection(medicine.id)}
          >
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={selectedMedicines[medicine.id]}
                onValueChange={() => toggleMedicineSelection(medicine.id)}
                style={styles.checkbox}
                color='#E58B68'
              />
              <View style={styles.textContainer}>
                <Text style={styles.medicineName}>{medicine.medicineName}</Text>
                <Text style={styles.unit}>{medicine.unit}</Text>
              </View>
            </View>
            <PopupMenu onEdit={() => alert('Edit')} onDelete={() => alert('Delete')}/>
          </TouchableOpacity>
          {index < medicines.length - 1 && <Divider withMargin={false} />}
          </View>
        ))}

        <TouchableOpacity style={styles.createButton} onPress={() => router.push('createMedicine')}>
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
