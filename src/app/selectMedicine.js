import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getMedicine } from './service/diaryService'
import { useAuth } from './context/authContext'
import Checkbox from 'expo-checkbox'

const selectMedicine = () => {
  const { user } = useAuth()
  const [medicines, setMedicines] = useState([])
  const [selectedMedicines, setSelectedMedicines] = useState({})

  useEffect(() => {
    const fetchMedicines = async () => {
      if(user) {
        try { 
          const medicinesList = await getMedicine(user.uid);
          setMedicines(medicinesList);
        } catch(error) {
          console.error('Error fetching medicines:', error);
        }
      }
    }
    fetchMedicines()
  }, [user])

  const toggleMedicineSelection = (id) => {
    setSelectedMedicines(prevState => {
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
    // Implement the logic to save the selected medicines
    console.log('Selected Medicines:', selectedMedicines);
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Select meds',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/home')}>
                <Ionicons name='chevron-back' size={24} color='white'/>
            </TouchableOpacity>
        ),headerRight: () => (
            <TouchableOpacity onPress={saveMeds}>
                <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-SemiBold', fontSize:16, color:'white'}}>Save</Text>
            </TouchableOpacity>
        ),
        headerTitle: 'Select meds',
        headerTitleAlign: 'center',
      }}/>
      <ScrollView style={{flex:1, backgroundColor:'#f5f5f5'}}>
        {medicines.map(medicine => (
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
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={{padding:16, backgroundColor:'white', justifyContent:'center'}}>
          <Text>Create medicine</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

export default selectMedicine

const styles = StyleSheet.create({
  button: {
    backgroundColor:'white',
    paddingHorizontal:16,
    paddingVertical:8,
    justifyContent:'center',
    borderBottomColor:'#808080',
    borderBottomWidth:0.5
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
    fontSize:14,
    fontFamily:'Poppins-Regular'
  },
  unit: {
    fontSize:12,
    fontFamily:'Poppins-Regular',
    color:'#808080'
  }
})
