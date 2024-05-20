import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Platform, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageButton from '../components/ImageButton';
import { router } from 'expo-router';
import { images } from '../constants/images'


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 50 :0
  },
  contentContainer: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    paddingTop: 12,
    marginRight: 90,
    marginTop: 60,
  },
  subHeaderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    marginLeft: 45,
    marginRight: 40,
    color: '#808080',
    marginBottom: 40,
  },
  pickerWrapper: {
    width: 300,
    borderBottomWidth: 1,
    borderColor: '#077167',
    marginBottom: 20,
  },
  picker: {
    height: 50,  // You can adjust the height if necessary
    marginTop: 0,
    marginBottom: 0,
  },
  pickerItem: {
    height: 50,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderColor: '#077167',
    padding: 16,
    
    justifyContent: 'center',
    width: 300,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    
  },
  textInput: {
    height: 50,
    paddingHorizontal: 16,
    width: 300,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#077167',
  },
  button: {
    marginTop: 150,
    backgroundColor: '#FF7A00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: 312,
    height: 50,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default function UserProfile() {
  const [gender, setGender] = useState('Male');
  const [birthdate, setBirthdate] = useState(new Date(2002, 8, 9));
  const [weight, setWeight] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(false);
    setBirthdate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'25%', alignItems:'flex-start', paddingLeft:20, justifyContent:'center'}}>
          <ImageButton
            source={require("../assets/back(2).png")}
            onPress={() => router.back('/registerPage')}
          />
        </View>
        <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
        <Text style={[styles.titleText, {paddingBottom:5}]}>User profiling</Text>
        <Image source={images.headerQuestion1}/>
        </View>
        <View style={{width:'25%'}}/>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Tell us about yourself</Text>
        <Text style={styles.subHeaderText}>
          Don't worry, we keep your info safe and only use it to make sure you get the best help with your health.
        </Text>
        <View style={{width:'75%'}}>
          <Text style={styles.label}>Your Weight</Text>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="male"/>
            <Picker.Item label="Female" value="female"/>
          </Picker>
        </View>

        <View>
          <Text style={styles.label}>Your Birthdate</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
            <Text>{birthdate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View>
          <Text style={styles.label}>Your Weight</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}





