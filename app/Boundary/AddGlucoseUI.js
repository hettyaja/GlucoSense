import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from '../service/AuthContext';
import CreateGlucoseLogsController from '../Controller/CreateGlucoseLogsController';
import Header from '../components/Header';
import * as Notifications from 'expo-notifications';
import ViewUserGoalsController from '../Controller/ViewUserGoalsController';

const preReg = () => {
  const { user } = useAuth();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Before breakfast");
  const [glucoseValue, setGlucoseValue] = useState('');
  const [notes, setNotes] = useState('');
  const [beforeMealLowerBound, setBeforeMealLowerBound] = useState();
  const [beforeMealUpperBound, setBeforeMealUpperBound] = useState();
  const [afterMealLowerBound, setAfterMealLowerBound] = useState();
  const [afterMealUpperBound, setAfterMealUpperBound] = useState();

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        const userGoals = await ViewUserGoalsController.viewUserGoals(user.uid);
        setBeforeMealLowerBound(userGoals.goals.glucoseGoals.beforeMealLowerBound);
        setBeforeMealUpperBound(userGoals.goals.glucoseGoals.beforeMealUpperBound);
        setAfterMealLowerBound(userGoals.goals.glucoseGoals.afterMealLowerBound);
        setAfterMealUpperBound(userGoals.goals.glucoseGoals.afterMealUpperBound);
      } catch (error) {
        console.error('Failed to load user goals:', error);
      }
    };

    fetchUserGoals();
  }, [user.uid]);

  const getSingaporeTime = () => {
    const now = new Date();
    const options = { timeZone: 'Asia/Singapore', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(now);

    const singaporeTime = new Date(`${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}T${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}:${parts.find(p => p.type === 'second').value}`);

    if (isNaN(singaporeTime.getTime())) {
      console.error("Invalid Date generated for Singapore time");
    }

    return singaporeTime;
  };

  const [selectedDate, setSelectedDate] = useState(getSingaporeTime());

  const handleChange = (text) => {
    const newText = text.replace(/[^0-9.]/g, '');

    if (newText.split('.').length > 2) {
      return;
    }

    setGlucoseValue(newText);
  };

  const saveGlucose = async () => {
    if (!glucoseValue) {
      Alert.alert(
        "No Glucose Reading",
        "Please input glucose reading before saving.",
        [{ text: "OK" }]
      );
      return;
    }

    if (user) {
      const newGlucoseLog = {
        time: selectedDate,
        period: selectedValue,
        glucose: glucoseValue,
        notes: notes
      };

      try {
        await CreateGlucoseLogsController.createGlucoseLogs(user.uid, newGlucoseLog);
        console.log('Glucose log saved:', newGlucoseLog);

        checkGlucoseBounds(parseFloat(glucoseValue), selectedValue);

        router.replace('Boundary/home');
      } catch (error) {
        console.error('Error saving glucose log:', error);
      }
    }
  };

  const checkGlucoseBounds = (glucose, period) => {
    let isOutOfBounds = false;
    if (period.includes('Before')) {
      if (glucose < beforeMealLowerBound || glucose > beforeMealUpperBound) {
        isOutOfBounds = true;
      }
    } else if (period.includes('After')) {
      if (glucose < afterMealLowerBound || glucose > afterMealUpperBound) {
        isOutOfBounds = true;
      }
    }

    if (isOutOfBounds) {
      sendGlucoseOutOfBoundsNotification(glucose);
    }
  };

  const sendGlucoseOutOfBoundsNotification = async (glucose) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Glucose Level Alert",
        body: `Your glucose level of ${glucose} mg/dL is out of the recommended range.`,
        data: { glucose },
      },
      trigger: null, // Send immediately
    });
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <>
      <Header
        title='Glucose'
        leftButton='Close'
        onLeftButtonPress={() => router.back('/home')}
        rightButton='Save'
        onRightButtonPress={() => saveGlucose()}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.value}>{selectedDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Period</Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Before breakfast" value="Before breakfast" />
              <Picker.Item label="After breakfast" value="After breakfast" />
              <Picker.Item label="Before lunch" value="Before lunch" />
              <Picker.Item label="After lunch" value="After lunch" />
              <Picker.Item label="Before dinner" value="Before dinner" />
              <Picker.Item label="After dinner" value="After dinner" />
            </Picker>
          </View>
        </View>
        <View style={styles.centered}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/glucoseScanner')}>
            <Feather name="camera" size={24} />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Glucose</Text>
            <View style={styles.glucoseInputContainer}>
              <TextInput
                style={styles.glucoseInput}
                defaultValue={glucoseValue}
                placeholder='000'
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={3}
                color="#808080"
              />
              <Text style={styles.unit}>mg/dL</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder='Add your notes'
              value={notes}
              onChangeText={(text) => setNotes(text)}
            />
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        display='inline'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 16,
  },
  section: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    marginHorizontal: 16,
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
  },
  picker: {
    width: '50%',
    height: 40,
    color: '#808080',
  },
  centered: {
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    elevation: 4,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginLeft: 8,
  },
  glucoseInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  glucoseInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    width: 50,
  },
  unit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  notesInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
    marginHorizontal: 16,
  },
});

export default preReg;
