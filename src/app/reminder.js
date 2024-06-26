import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Header from '../components/Header';
import { useAuth } from './context/authContext';
import { fetchReminders } from './service/reminderService';


const reminder = () => {
  const { user } = useAuth()
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    const getReminder = async () => {
      if (user) {
        try {
          const remindersList = await fetchReminders(user.uid);
          setReminders(remindersList);
        } catch (error) {
          console.error('Error fetching reminder:', error);
        }
      }
    };
    getReminder();
  }, [user]);

  const handleLeftButton = () => {
    router.back()
  }

  const handleRightButton = () => {
    router.push('/createReminder')
  }

  return (
    <>
      <Header
        title='Reminder'
        leftButton='Back'
        onLeftButtonPress={handleLeftButton}
        rightButton='Add'
        onRightButtonPress={handleRightButton}
      />

    <ScrollView style={styles.container}>
      {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <TouchableOpacity key={reminder.id} style={styles.reminderItem}>
                <Text style={styles.reminderText}>{reminder.type}</Text>
                <Text style={styles.reminderText}>{reminder.day} - {reminder.time}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noRemindersText}>No reminders available</Text>
          )}
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5f5f5'
  },
  reminderItem: {
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    padding:16
  },
  reminderText: {
  },
  noRemindersText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
export default reminder
