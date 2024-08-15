import { View, Text, StyleSheet, Alert, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather'
import { useAuth } from '../service/AuthContext';
import CreateMealLogsController from '../Controller/CreateMealLogsController';
import Header from '../components/Header';
import ViewMealLogsController from '../Controller/ViewMealLogsController';
import ViewUserGoalsController from '../Controller/ViewUserGoalsController';
import * as Notifications from 'expo-notifications';

const handleBackButton = () => {
  router.back()
}

const addMeals = () => {
  const { user } = useAuth();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Before breakfast");
  const { mealData } = useLocalSearchParams();
  const [parsedMealData, setParsedMealData] = useState(mealData ? JSON.parse(mealData) : null);

  const [calories, setCalories] = useState(parsedMealData?.calories || 0);
  const [fat, setFat] = useState(parsedMealData?.fat || 0);
  const [carbs, setCarbs] = useState(parsedMealData?.carbs || 0);
  const [protein, setProtein] = useState(parsedMealData?.protein || 0);
  const [notes, setNotes] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(true); // New state variable

  useEffect(() => {
    if (parsedMealData && selectedDate) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [parsedMealData, selectedDate]);

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

  const saveMeals = async () => {
    if (!parsedMealData) {
      Alert.alert(
        "No Food Selected",
        "Please select food before saving.",
        [{ text: "OK" }]
      );
      return;
    }
    if (user) {
      const newMealLog = {
        time: selectedDate,
        period: selectedValue,
        mealName: parsedMealData.label,
        servings: parsedMealData.servings,
        calories: parsedMealData.calories,
        carbs: parsedMealData.carbs,
        fat: parsedMealData.fat,
        protein: parsedMealData.protein,
        notes: notes,
      };
  
      try {
        await CreateMealLogsController.createMealLogs(user.uid, newMealLog);
        console.log('Meal log saved:', newMealLog);
  
        // Fetch user goals
        const userGoals = await ViewUserGoalsController.viewUserGoals(user.uid);
        // Determine which goal is set as the default
        let calorieGoal;
        if (userGoals.goals.BMRGoals.default) {
          calorieGoal = userGoals.goals.BMRGoals.calorieGoals;
        } else if (userGoals.goals.customGoals.default) {
          calorieGoal = userGoals.goals.customGoals.calorieGoals;
        }
  
        // Fetch meal logs for today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to start of day
        const mealLogs = await ViewMealLogsController.viewMealLogs(user.uid);
  
        // Calculate total calories consumed today
        const totalCaloriesConsumed = mealLogs.reduce((total, log) => {
          const logDate = log.time.toDate(); 
          if (logDate >= today) {
            return total + parseFloat(log.calories); // Ensure calories are treated as numbers
          }
          return total;
        }, 0);
        console.log(totalCaloriesConsumed)
        // Check if total calories exceed the goal
        if (totalCaloriesConsumed > calorieGoal) {
          // Send notification
          console.log('hii')
          sendCalorieExceededNotification(totalCaloriesConsumed, calorieGoal);
        }
  
        router.replace('Boundary/home');
      } catch (error) {
        console.error('Error saving meal log:', error);
      }
    }
  };

  const sendCalorieExceededNotification = async (totalCalories, calorieGoal) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Calorie Goal Exceeded",
        body: `You have consumed ${totalCalories} kcal today, which exceeds your daily goal of ${calorieGoal} kcal.`,
        data: { totalCalories, calorieGoal },
      },
      trigger: null, // Send immediately
    });
  };

  const removeData = () => {
    setParsedMealData(null),
    setCalories(0),
    setCarbs(0),
    setFat(0),
    setProtein(0)
  }

  const clearMealData = () => {
    Alert.alert(
      "Delete Meal",
      "Are you sure you want to delete this meal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => removeData()}
      ],
      { cancelable: false }
    );
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
        title='Create Meal Diary'
        leftButton='Close'
        onLeftButtonPress={() => handleBackButton()}
        rightButton='Save'
        onRightButtonPress={saveMeals}
        rightButtonStyle={isSaveDisabled ? styles.disabledButton : styles.enabledButton} // Updated style
        rightButtonDisabled={isSaveDisabled} // Disable the button if no meal data
      />
      
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16}}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular' }}>Time</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{selectedDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', paddingHorizontal:16 }}>Period</Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              itemStyle={styles.pickerItem}
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {borderRightColor:'#808080', borderRightWidth:0.5}]} onPress={() => router.push('/searchFood')}>
            <Text style={styles.buttonText}>Search</Text>
            <Fontisto name="search" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/barcodeScanner')}>
            <Text style={styles.buttonText}>Scan</Text>
            <MaterialCommunityIcons name='barcode-scan' size={32} />
          </TouchableOpacity>
        </View>

        {parsedMealData && (
          <View style={{flexDirection:'row', borderRadius:8, backgroundColor:'white',marginHorizontal:24, marginTop:16, padding:16, justifyContent:'space-between'}}>
            <Text style={styles.itemTitle}>{parsedMealData.label}</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.itemTitle, {paddingRight:8}]}>{parsedMealData.servings} Serving</Text>
              {/* this clicked and will be an option to delete */}
              <TouchableOpacity onPress={() => clearMealData()}>
                <Feather name='trash-2' color='red' size={16}/>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Calories</Text>
            <Text style={styles.itemTitle}>{calories} kcal</Text>
          </View>

          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Carbs</Text>
            <Text style={styles.itemTitle}>{carbs} g</Text>
          </View>

          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Protein</Text>
            <Text style={styles.itemTitle}>{protein} g</Text>
          </View>

          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Fat</Text>
            <Text style={styles.itemTitle}>{fat} g</Text>
          </View>

          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Notes</Text>
            <TextInput 
              style={styles.notesTitle} 
              placeholder='Add notes'
              onChangeText={setNotes}
              value={notes}
              multiline
            />
          </View>
          
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 24,
  },
  buttonContainer: {
    backgroundColor:'white',
    flexDirection:'row',
    marginHorizontal:24,
    justifyContent:'space-between',
    borderRadius:8,
  },
  button: {
    alignItems:'center',
    padding:16,
    width:'50%'
  },
  item: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:16,
    paddingVertical:8,
  },
  itemTitle: {
    fontSize:14,
    fontFamily: "Poppins-Regular",
  },
  notesTitle: {
    fontSize:14,
    fontFamily: "Poppins-Regular",
    textAlign:'right',
    flex:1
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '55%',
    color: '#808080',
  },
  pickerItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    height: 36,
    marginHorizontal: 16
  },
  disabledButton: {
    opacity: 0.5,
  },
  enabledButton: {
    opacity: 1, 
  },
});

export default addMeals;
