import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import RNNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../service/AuthContext';
import UpdateMedicineListController from '../Controller/UpdateMedListController';
import Header from '../components/Header';

const editMedList = () => {
  const { user } = useAuth();
  const { medData } = useLocalSearchParams();
  const [parsedMedData, setParsedMedData] = useState(medData ? JSON.parse(medData) : null);

  const [medicineName, setMedicineName] = useState(parsedMedData.medicineName);
  const [selectedType, setSelectedType] = useState(parsedMedData.type);
  const [selectedUnit, setSelectedUnit] = useState(parsedMedData.unit);
  const [selectedInsulinType, setSelectedInsulinType] = useState(parsedMedData.InsulinType);

  const handleBackButton = () => {
    router.back();
  };

  const saveMeds = async () => {
    if (user) {
      const updateMedList = {
        id: parsedMedData.id,
        medicineName,
        type: selectedType,
        InsulinType: selectedInsulinType,
        unit: selectedUnit,
      };

      try {
        await UpdateMedicineListController.updateMedicineList(user.uid, updateMedList);
        console.log('Med list updated:', updateMedList);
        router.back('');
      } catch (error) {
        console.error('Error updating med list:', error);
      }
    }
  };

  return (
    <>
      <Header
        title='Edit Medicine Info'
        leftButton='Back'
        onLeftButtonPress={handleBackButton}
        rightButton='Save'
        onRightButtonPress={saveMeds}
      />
      <View style={styles.container}>
        <View style={styles.item}>
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
          {Platform.OS === 'ios' ? (
            <RNNPickerSelect
              onValueChange={(itemValue) => setSelectedType(itemValue)}
              placeholder={{ label: 'Select Type', value: null, fontFamily: 'Poppins-Regular', fontSize: 14 }}
              items={[
                { label: 'Pill', value: 'Pill' },
                { label: 'Insulin', value: 'Insulin' }
              ]}
            />
          ) : (
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => setSelectedType(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode='dropdown'
            >
              <Picker.Item label="Pill" value='Pill'/>
              <Picker.Item label="Insulin" value='Insulin'/>
            </Picker>
          )}
        </View>
        {selectedType === 'Insulin' && (
          <View style={styles.item}>
            <Text style={styles.itemText}>Insulin Type</Text>
            {Platform.OS === 'ios' ? (
              <RNNPickerSelect
                onValueChange={(itemValue) => setSelectedInsulinType(itemValue)}
                placeholder={{ label: 'Select Insulin Type', value: null, fontFamily: 'Poppins-Regular', fontSize: 14 }}
                items={[
                  { label: 'Basal', value: 'Basal' },
                  { label: 'Bolus', value: 'Bolus' }
                ]}
              />
            ) : (
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
            )}
          </View>
        )}
        <View style={[styles.item, { borderBottomWidth: 0.5, borderColor: '#808080' }]}>
          <Text style={styles.itemText}>Unit</Text>
          {Platform.OS === 'ios' ? (
            <RNNPickerSelect
              onValueChange={(itemValue) => setSelectedUnit(itemValue)}
              placeholder={{ label: 'Select Unit', value: null, fontFamily: 'Poppins-Regular', fontSize: 14 }}
              items={[
                { label: 'mg', value: 'mg' },
                { label: 'ml', value: 'ml' },
                { label: 'pill', value: 'pill'},
                { label: 'unit', value: 'unit'}
              ]}
            />
          ) : (
            <Picker
              selectedValue={selectedUnit}
              onValueChange={(itemValue) => setSelectedUnit(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode='dropdown'
            >
              <Picker.Item label="mg" value='mg'/>
              <Picker.Item label="ml" value='ml'/>
              <Picker.Item label="pill" value='pill'/>
              <Picker.Item label="unit" value='unit'/>
            </Picker>
          )}
        </View>
      </View>
    </>
  );
};

export default editMedList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    marginTop: 16
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 0.5,
    borderColor: '#808080',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  pickerItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    height: 40
  }
});
