import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Platform, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageButton from '../../components/ImageButton';
import { router, Stack } from 'expo-router';
import { images } from '../../constants/images';
import { useAuth } from '../../service/AuthContext';
import CreateBodyProfileController from '../../Controller/CreateBodyProfileController';

export default function UserProfile() {
  const { user } = useAuth();
  const [gender, setGender] = useState('Male');
  const [birthdate, setBirthdate] = useState(new Date(2002, 8, 9));
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(false);
    setBirthdate(currentDate);
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleContinue = async () => {
    const age = calculateAge(birthdate);
    if (age < 10) {
      Alert.alert("Invalid Age", "You must be at least 10 years old.");
      return;
    } else if (!weight) {
      Alert.alert("Empty Field", "Weight cannot be empty.");
      return;
    } else if (!height) {
        Alert.alert("Empty Field", "Height cannot be empty.");
        return;
    }

    const bodyProfileData = {
      gender,
      birthdate: birthdate.toISOString(),
      weight,
      height,
    };
    
    try {
      await CreateBodyProfileController.createBodyProfile(user.uid, bodyProfileData)
    } catch (error) {
      alert(error.message);
    }
    // Navigate to the next screen
    router.push('Boundary/question2');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown:false}}/>
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '25%', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
        </View>
        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[styles.titleText, { paddingBottom: 5 }]}>User profiling</Text>
          <Image source={images.headerQuestion1} resizeMode='contain' style={{ width: 168, height: 7 }} />
        </View>
        <View style={{ width: '25%' }} />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tell us about yourself</Text>
        <Text style={styles.subHeaderText}>
          Don't worry, we keep your info safe and only use it to make sure you get the best help with your health.
        </Text>
      </View>

      <View style={{ paddingTop: 20, width: '100%', alignItems: 'center' }}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Your Gender</Text>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Your Birthdate</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text style={{ fontFamily: 'Poppins-Regular' }}>{birthdate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthdate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                style={styles.datePicker} // Add this line
              />
            )}
          </View>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Your Weight (kg)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Your Height (cm)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your height"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    alignItems: 'center'
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  headerContainer: {
    width: '75%',
    alignItems: 'flex-start',
    marginTop: 50
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24
  },
  subHeaderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#808080'
  },
  pickerWrapper: {
    width: '75%',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  picker: {
    height: 55
  },
  pickerItem: {
    height: 55,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  dateInput: {
    padding: 16
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  textInput: {
    height: 50,
    paddingHorizontal: 16,
    width: 300
  },
  button: {
    marginTop: 50,
    backgroundColor: '#D96B41',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
