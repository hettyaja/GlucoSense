import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Picker } from 'react-native';
import Header from './components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import RNNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications';
import { updateReminder, deleteReminder } from './service/reminderService';
import { useAuth } from './Controller/authController';

const editReminder = () => {
  const { user } = useAuth();
  const { reminderData } = useLocalSearchParams();
  const [parsedReminderData, setParsedReminderData] = useState(reminderData ? JSON.parse(reminderData) : null);
  const [selectedType, setSelectedType] = useState(parsedReminderData ? parsedReminderData.type : null);
  const [selectedDay, setSelectedDay] = useState(parsedReminderData ? parsedReminderData.day : null);

  // Parse the time correctly
  const [selectedTime, setSelectedTime] = useState(() => {
    if (parsedReminderData) {
      const [hours, minutes] = parsedReminderData.time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      return date;
    }
    return new Date();
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access notifications was denied');
    }
  };

  const handleLeftButton = () => {
    router.back();
  };

  const handleRightButton = async () => {
    if (user) {
      const reminderData = {
        id: parsedReminderData.id,
        type: selectedType,
        day: selectedDay,
        time: selectedTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      };

      try {
        await updateReminder(user.uid, reminderData);
        scheduleNotification(reminderData);
        router.replace('reminder');
      } catch (error) {
        console.error('Error updateing reminder:', error);
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
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
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

  const handleDelete = async () => {
    try {
        console.log(reminderData.id)
        await deleteReminder(user.uid, parsedReminderData);
        router.replace('reminder')
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
  }

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
        title="Edit Reminder"
        leftButton="Back"
        rightButton="Save"
        onLeftButtonPress={handleLeftButton}
        onRightButtonPress={handleRightButton}
      />
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text>Type</Text>
            {Platform.OS === 'ios' ? (
              <RNNPickerSelect
                onValueChange={(itemValue) => setSelectedType(itemValue)}
                value={selectedType}
                placeholder={{ label: 'Select type', value: null, fontFamily: 'Poppins-Regular', fontSize: 14 }}
                items={[
                  { label: 'Glucose', value: 'Glucose' },
                  { label: 'Meal', value: 'Meal' },
                  { label: 'Medicine', value: 'Medicine' }
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
                <Picker.Item label="Glucose" value='Glucose' />
                <Picker.Item label="Meal" value='Meal' />
                <Picker.Item label="Medicine" value='Medicine' />
              </Picker>
            )}
          </View>
          <View style={styles.item}>
            <Text>Day</Text>
            {Platform.OS === 'ios' ? (
              <RNNPickerSelect
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                value={selectedDay}
                placeholder={{ label: 'Select day', value: null, fontFamily: 'Poppins-Regular', fontSize: 14 }}
                items={[
                  { label: 'Everyday', value: 'Everyday' },
                  { label: 'Monday', value: 'Monday' },
                  { label: 'Tuesday', value: 'Tuesday' },
                  { label: 'Wednesday', value: 'Wednesday' },
                  { label: 'Thursday', value: 'Thursday' },
                  { label: 'Friday', value: 'Friday' },
                  { label: 'Saturday', value: 'Saturday' },
                  { label: 'Sunday', value: 'Sunday' }
                ]}
              />
            ) : (
              <Picker
                selectedValue={selectedDay}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode='dropdown'
              >
                <Picker.Item label="Everyday" value='Everyday' />
                <Picker.Item label="Monday" value='Monday' />
                <Picker.Item label="Tuesday" value='Tuesday' />
                <Picker.Item label="Wednesday" value='Wednesday' />
                <Picker.Item label="Thursday" value='Thursday' />
                <Picker.Item label="Friday" value='Friday' />
                <Picker.Item label="Saturday" value='Saturday' />
                <Picker.Item label="Sunday" value='Sunday' />
              </Picker>
            )}
          </View>
          <View style={styles.item}>
            <Text>Time</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{selectedTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
            <TouchableOpacity style={{padding: 16, alignItems: 'center' }} onPress={() => handleDelete()}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize:16, color:'red'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  )
}

export default editReminder;

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
    height: 55
  },
  pickerItem: {
    height: 55,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  }
});
