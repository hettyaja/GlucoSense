import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../service/AuthContext';
import CreateMedListController from '../Controller/CreateMedListController';


const createMedicine = () => {
  const { user } = useAuth()
  const [medicineName, setMedicineName] = useState('')
  const [selectedType, setSelectedType] = useState('Pill');
  const [selectedUnit, setSelectedUnit] = useState('mg');
  const [selectedInsulinType, setSelectedInsulinType] = useState(null);

  const handleBackButton = () => {
    router.back();
  };


  useEffect(() => {
    if (selectedType === 'Insulin') {
      setSelectedInsulinType('Basal');
    }
  }, [selectedType]);


  const handleSaveButton = async () => {
    if (user) {
      const newMedicine = {
        medicineName: medicineName,
        type: selectedType,
        InsulinType: selectedInsulinType,
        unit:  selectedUnit
      }
    
      try {
        await CreateMedListController.createMedsList(user.uid, newMedicine);
        console.log('Medicine log saved:', newMedicine);
        router.replace('Boundary/SelectMedicineUI');
      } catch (error) {
        console.error('Error saving medicine log:', error);
      }
    }
  };

  return (
    <>
      <Header
        title='Create Medicine'
        leftButton='Back'
        onLeftButtonPress={handleBackButton}
        rightButton='Save'
        onRightButtonPress={handleSaveButton}
      />
      <View style={styles.container}>
        <View style={[styles.item, {paddingVertical:16}]}>
          <Text style={styles.itemText}>Name</Text>
          <TextInput 
            placeholder='Medicine Name' 
            style={styles.inputText}
            value={medicineName}
            onChangeText={(text) => setMedicineName(text)}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Type</Text>

            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => setSelectedType(itemValue)}
              style={styles.picker}
              mode='dropdown'
            >
              <Picker.Item label="Pill" value='Pill'/>
              <Picker.Item label="Insulin" value='Insulin'/>
            </Picker>
        </View>
        {selectedType === 'Insulin' && (
          <View style={styles.item}>
            <Text style={styles.itemText}>Insulin Type</Text>

              <Picker
                selectedValue={selectedInsulinType}
                onValueChange={(itemValue) => setSelectedInsulinType(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode='dropdown'
              >
                <Picker.Item label="Basal" value='Basal'/>
                <Picker.Item label="Bolus" value='Bolus'/>
              </Picker>
          </View>
        )}
        <View style={[styles.item, { borderBottomWidth: 0.5, borderColor: '#808080' }]}>
          <Text style={styles.itemText}>Unit</Text>

            <Picker
              selectedValue={selectedUnit}
              onValueChange={(itemValue) => setSelectedUnit(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode='dropdown'
            >
              <Picker.Item label="mg" value='mg'/>
              <Picker.Item label="ml" value='ml'/>
            </Picker>

        </View>
      </View>
    </>
  );
};

export default createMedicine;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    marginTop: 16
  },
  item: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderColor: '#808080',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:16
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
    textAlign: 'right'
  },
  picker: {
    width: '35%',
    justifyContent: 'center'
  },
});
