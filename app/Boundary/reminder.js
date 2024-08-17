import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router, useFocusEffect} from 'expo-router'
import Header from '../components/Header';
import { useAuth } from '../service/AuthContext';
import ViewReminderController from '../Controller/ViewReminderController';



const reminder = () => {
  const { user } = useAuth()
  const [reminders, setReminders] = useState([])


  const getReminder = async () => {
    if (user) {
      try {
        const remindersList = await ViewReminderController.viewReminder(user.uid);
        setReminders(remindersList);
      } catch (error) {
        console.error('Error fetching reminder:', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReminder();
    }, [user])
  )

  const handleLeftButton = () => {
    router.back()
  }

  const handleRightButton = () => {
    router.push('Boundary/CreateReminderUI')
  }

  const handleEdit = (item) => {
    router.push({pathname: 'Boundary/UpdateReminderUI', params: {reminderData: JSON.stringify(item)}})
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
              <TouchableOpacity key={reminder.id} style={styles.reminderItem} onPress={() => handleEdit(reminder)}>
                <Text style={styles.reminderText1}>{reminder.type}</Text>
                <Text style={styles.reminderText2}>{reminder.day} - {reminder.time}</Text>
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
  reminderText1: {
    fontFamily:'Poppins-SemiBold',
    fontSize:14
  },
  reminderText2: {
    fontFamily:'Poppins-Regular',
    fontSize:14
  },
  noRemindersText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 300,
  },
});
export default reminder
