import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Platform, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageButton from '../../components/ImageButton';
import { router } from 'expo-router';
import { images } from '../../constants/images';


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
            source={require("../../assets/back(2).png")}
            imageSize={{width:24, height:24}}
            onPress={() => router.back('/registerPage')}
          />
        </View>
        <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
        <Text style={[styles.titleText, {paddingBottom:5}]}>User profiling</Text>
        <Image source={images.headerQuestion1} resizeMode='contain' style={{width:168, height:7}}/>
        </View>
        <View style={{width:'25%'}}/>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tell us about yourself</Text>
        <Text style={styles.subHeaderText}>
          Don't worry, we keep your info safe and only use it to make sure you get the best help with your health.
        </Text>
      </View>

      <View style={{paddingTop:50, width:'100%', alignItems:'center'}}>
        <View style={styles.pickerWrapper}>
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

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Your Birthdate</Text>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text style={{fontFamily:'Poppins-Regular'}}>{birthdate.toLocaleDateString()}</Text>
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
          <Text style={styles.label}>Your Weight</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>
      </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/question2')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 50 :0,
    alignItems: 'center'
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  headerContainer: {
    width:'75%',
    alignItems:'flex-start',
    marginTop:50
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
    marginTop: 150,
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