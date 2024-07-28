import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import Header from './components/Header';
import { router } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications';
import { useAuth } from './service/AuthContext';
import CreateReminderController from './Controller/CreateReminderController';
import { Picker } from '@react-native-picker/picker';

// Request notification permissions
async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access notifications was denied');
  }
}

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const createReminder = () => {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState('Glucose');
  const [selectedDay, setSelectedDay] = useState('Everyday');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const handleLeftButton = () => {
    router.back();
  };

  const handleRightButton = async () => {
    if (user) {
      const reminderData = {
        type: selectedType,
        day: selectedDay,
        time: selectedTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      };

      try {
        await CreateReminderController.createReminder(user.uid, reminderData);
        scheduleNotification(reminderData);
        router.replace('reminder');
      } catch (error) {
        console.error('Error saving reminder:', error);
        Alert.alert('Error', 'An error occurred while saving the reminder.');
      }
    }
  };

  const scheduleNotification = async (reminder) => {
    let trigger;
    if (reminder.day === 'Everyday') {
      trigger = {
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes(),
        repeats: true,
      };
    } else {
      const dayMap = {
        Sunday: 1,
        Monday: 2,
        Tuesday: 3,
        Wednesday: 4,
        Thursday: 5,
        Friday: 6,
        Saturday: 7,
      };
      trigger = {
        weekday: dayMap[reminder.day],
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes(),
        repeats: true,
      };
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: `It's time to ${reminder.type.toLowerCase()}!`,
      },
      trigger,
    });

    console.log('Notification scheduled with trigger:', trigger);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedTime(date);
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <>
      <Header
        title="Create Reminder"
        leftButton="Back"
        rightButton="Save"
        onLeftButtonPress={handleLeftButton}
        onRightButtonPress={handleRightButton}
      />
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text>Type</Text>
              <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue) => setSelectedType(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Glucose" value="Glucose" />
                <Picker.Item label="Meal" value="Meal" />
                <Picker.Item label="Medicine" value="Medicine" />
              </Picker>
          </View>
          <View style={styles.item}>
            <Text>Day</Text>
              <Picker
                selectedValue={selectedDay}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Everyday" value="Everyday" />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
          </View>
          <View style={styles.item}>
            <Text>Time</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{selectedTime.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' })}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

export default createReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080'
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  picker: {
    height: 55,
    width: 150, // Add width to ensure it's displayed properly
  },
  pickerItem: {
    height: 55,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  }
});
