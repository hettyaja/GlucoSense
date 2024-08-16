import { View, Text, StyleSheet, TouchableOpacity, SectionList, Alert } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../service/AuthContext';
import Header from '../../components/Header';
import A1CComponent from '../../components/A1C'; // Ensure this import is correct
import PopupMenu from '../../components/PopupMenu';
import Divider from '../../components/Divider';
import ViewGlucoseLogsController from '../../Controller/ViewGlucoseLogsController';
import ViewMedicineLogsController from '../../Controller/ViewMedicineLogsController';
import ViewMealLogsController from '../../Controller/ViewMealLogsController';
import getProfileController from '../../Controller/getProfileController';
import FetchA1cController from '../../Controller/FetchA1cController';
import Modal from 'react-native-modal'; // Import from react-native-modal
import BottomSheetModal from './add';
import ViewUserGoalsController from '../../Controller/ViewUserGoalsController';
import DeleteLogsController from '../../Controller/DeleteLogsController';

const formatDate = (time) => {
  const date = new Date(time.seconds * 1000);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
};

const groupLogsByDate = (logs) => {
  return logs.reduce((groups, log) => {
    const date = formatDate(log.time);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {});
};


const home = () => {
  const [isA1CModalVisible, setA1CModalVisible] = useState(false); // State for A1C Modal
  const [isA1CModalVisible1, setA1CModalVisible1] = useState(false); // State for A1C Modal
  const [a1cMessage, setA1cMesssage] = useState('');
  const { user } = useAuth();
  const [dateType, setDateType] = useState('Today');
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [averageGlucose, setAverageGlucose] = useState(null);
  const [lowestGlucose, setLowestGlucose] = useState(null);
  const [highestGlucose, setHighestGlucose] = useState(null);
  const [logsLoaded, setLogsLoaded] = useState(false);
  const [refreshA1C, setRefreshA1C] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState('');
  const [a1c, setA1c] = useState('');
  const [beforeMealLowerBound, setBeforeMealLowerBound] = useState();
  const [beforeMealUpperBound, setBeforeMealUpperBound] = useState();
  const [afterMealLowerBound, setAfterMealLowerBound] = useState();
  const [afterMealUpperBound, setAfterMealUpperBound] = useState();


  // Fetch user goals and logs when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadUserGoals = async () => {
        try {
          const profileData = await getProfileController.getProfile(user.uid);
          setSubscriptionType(profileData.subscriptionType);

          const a1cData = await FetchA1cController.fetchA1C(user.uid);
          setA1c(a1cData);

          const userGoals = await ViewUserGoalsController.viewUserGoals(user.uid);
          setBeforeMealLowerBound(userGoals.goals.glucoseGoals.beforeMealLowerBound);
          setBeforeMealUpperBound(userGoals.goals.glucoseGoals.beforeMealUpperBound);
          setAfterMealLowerBound(userGoals.goals.glucoseGoals.afterMealLowerBound);
          setAfterMealUpperBound(userGoals.goals.glucoseGoals.afterMealUpperBound);

          if (a1c < 5.7) {
            setA1cMesssage("Your A1C level is in the normal range! Keep up the great work to maintain your health.");
          } else if (a1c < 6.4) {
            setA1cMesssage("Your A1C level is slightly elevated. It's important to take steps to manage your glucose levels.");
          } else if (a1c >= 6.5) {
            setA1cMesssage("Your A1C level suggests diabetes. It’s crucial to consult with your healthcare provider to create a management plan.");
          }

          fetchAllLogs(); // Ensure logs are reloaded with updated goals
        } catch (error) {
          console.error('Error fetching user goals:', error);
        }
      };

      if (user.uid) {
        loadUserGoals();
      }
    }, [user.uid])
  );

  const [isModalVisible, setModalVisible] = useState(false);


  const fetchAllLogs = useCallback (async () => {
    if (user) {
      try {
        const [mealLogs, glucoseLogs, medicineLogs] = await Promise.all([
          ViewMealLogsController.viewMealLogs(user.uid),
          ViewGlucoseLogsController.viewGlucoseLogs(user.uid),
          ViewMedicineLogsController.viewMedicineLogs(user.uid),
        ]);

        const combinedLogs = [
          ...mealLogs.map(log => ({ ...log, type: 'meal' })),
          ...glucoseLogs.map(log => ({ ...log, type: 'glucose' })),
          ...medicineLogs.map(log => ({ ...log, type: 'medicine' })),
        ].sort((a, b) => b.time.seconds - a.time.seconds); // Sort logs by timestamp

        setLogs(combinedLogs);
        setFilteredLogs(combinedLogs);
        setLogsLoaded(true); // Set logs loaded to true
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchAllLogs();
  }, [fetchAllLogs]);

  useEffect(() => {
    if (logsLoaded) {
      calculateGlucoseStatsByDate('Today'); // Show today's statistics after logs are loaded
    }
  }, [logsLoaded]);

  useFocusEffect(
    useCallback(() => {
      setRefreshA1C(prevState => !prevState);
      fetchAllLogs()
    }, [fetchAllLogs])
  );

  const calculateGlucoseStats = (glucoseLogs) => {
    if (glucoseLogs.length === 0) {
      setAverageGlucose(null);
      setLowestGlucose(null);
      setHighestGlucose(null);
      return;
    }

    const glucoseValues = glucoseLogs.map(log => parseFloat(log.glucose));
    const average = glucoseValues.reduce((sum, value) => sum + value, 0) / glucoseValues.length;
    const lowest = Math.min(...glucoseValues);
    const highest = Math.max(...glucoseValues);

    setAverageGlucose(average.toFixed(2));
    setLowestGlucose(lowest);
    setHighestGlucose(highest);
  };

  const calculateGlucoseStatsByDate = (filterSelected, logsToCalculate = logs) => {
    const now = new Date(); // Current date and time
    let startDate;
    switch (filterSelected) {
      case 'Today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of today
        break;
      case '3D':
        startDate = new Date(now); // Create a copy of `now`
        startDate.setDate(now.getDate() - 3); // Last 3 days
        break;
      case '7D':
        startDate = new Date(now); // Create a copy of `now`
        startDate.setDate(now.getDate() - 7); // Last 7 days
        break;
      case '30D':
        startDate = new Date(now); // Create a copy of `now`
        startDate.setDate(now.getDate() - 30); // Last 30 days
        break;
      default:
        startDate = new Date(0); // Default to show all dates
        break;
    }
  
    const glucoseLogs = logsToCalculate.filter(log => log.type === 'glucose');
    const filteredGlucoseLogs = glucoseLogs.filter(log => {
      const logDate = new Date(log.time.seconds * 1000);
      // Filter out logs with a date in the future
      return logDate >= startDate && logDate < now;
    });
  
    calculateGlucoseStats(filteredGlucoseLogs);
  };

  const handleGlucoseFilter = (filterSelected) => {
    calculateGlucoseStatsByDate(filterSelected);
    setDateType(filterSelected);
  };

  const filterLogs = (type) => {
    if (type === 'Display all') {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter(log => log.type === type));
    }
  };

  const groupedLogs = groupLogsByDate(filteredLogs);
  const sections = Object.keys(groupedLogs).map(date => ({
    title: date,
    data: groupedLogs[date]
  }));

  const handleFilterType = (filterSelected) => {
    filterLogs(filterSelected);
  };

  const renderMedicineDetails = (medicines) => {
    return Object.entries(medicines).map(([medicineName, unit], index) => (
      <Text key={index} style={styles.buttonText}>
        {medicineName} - {unit}
      </Text>
    ));
  };

  const handleEdit = (item) => {
    if (item.type === 'meal') {
      router.push({ pathname: 'Boundary/UpdateMealsUI', params: { mealData: JSON.stringify(item) } });
    } else if (item.type === 'medicine') {
      router.push({ pathname: 'Boundary/UpdateMedLogUI', params: { medicineData: JSON.stringify(item) } });
    } else if (item.type === 'glucose') {
      router.push({ pathname: 'Boundary/UpdateGlucoseUI', params: { glucoseData: JSON.stringify(item) } });
    }
  };

  const confirmDelete = (item) => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this log?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete(item) }
      ]
    );
  };

  const handleDelete = async (item) => {
    try {
      await DeleteLogsController.deleteLogs(user.uid, item.type === 'meal' ? 'mealLogs' : item.type === 'medicine' ? 'medicineLogs' : 'glucoseLogs', item.id);
      const updatedLogs = filteredLogs.filter(log => log.id !== item.id);
      setFilteredLogs(updatedLogs);
      setLogs(updatedLogs);

      if (item.type === 'glucose') {
        const updatedGlucoseLogs = updatedLogs.filter(log => log.type === 'glucose');
        calculateGlucoseStatsByDate(dateType, updatedGlucoseLogs); // Pass updated glucose logs
      }
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  const renderLogItem = ({ item, index, section }) => {
    const isGlucoseOutOfBound = () => {
      if (item.type !== 'glucose') return false;
  
      const glucoseValue = parseFloat(item.glucose);
      if (item.period.includes('Before')) {
        return glucoseValue < beforeMealLowerBound || glucoseValue > beforeMealUpperBound;
      } else if (item.period.includes('After')) {
        return glucoseValue < afterMealLowerBound || glucoseValue > afterMealUpperBound;
      }
      return false;
    };
  
    const glucoseTextStyle = isGlucoseOutOfBound() ? [styles.buttonText, { color: 'red' }] : styles.buttonText;
  
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleEdit(item)}
        >
          {item.type === 'glucose' && <Fontisto name='blood-drop' size={24} color='black' style={{ paddingRight: 16 }} />}
          {item.type === 'medicine' && <Fontisto name='pills' size={24} color='black' style={{ paddingRight: 8 }} />}
          {item.type === 'meal' && <MaterialCommunityIcons name='food' size={24} color='black' style={{ paddingRight: 8 }} />}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingRight: 8 }}>
            <View>
              {item.type === 'medicine' ? (
                renderMedicineDetails(item.medicine)
              ) : (
                <Text style={glucoseTextStyle}>
                  {item.type === 'glucose' && `${item.glucose} mg/dL`}
                  {item.type === 'meal' && `${item.calories} kcal`}
                </Text>
              )}
              <Text style={styles.buttonText2}>{new Date(item.time.seconds * 1000).toLocaleTimeString()}</Text>
            </View>
            <View style={{ paddingRight: 16 }}>
              <PopupMenu
                onEdit={() => handleEdit(item)}
                onDelete={() => confirmDelete(item)}
              />
            </View>
          </View>
        </TouchableOpacity>
        {index < section.data.length - 1 && <Divider withMargin={false} />}
      </View>
    );
  };

  const handleA1CPress = () => {
    if (subscriptionType === 'premium') {
      if (a1c == '0'){
        setA1CModalVisible(true); // Show A1C modal
      } else {
        setA1CModalVisible1(true); // Show A1C modal
      }
    } else if (subscriptionType === 'free') {
      router.push('Boundary/Subscribe');
    }
  };

  const handleReminder = () => {
      if (subscriptionType === 'premium') {
        router.push('reminder')
      } else {
        router.push('Boundary/Subscribe')
      }
  }

  return (
    <>
      <Header
        title=''
        leftButton='Home'
        rightButton='Notification'
        onRightButtonPress={() => handleReminder()}
      />
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: 'white' }}>Blood Glucose</Text>
            <PopupMenu
              type='glucoseFilter'
              onToday={() => handleGlucoseFilter('Today')}
              on3D={() => handleGlucoseFilter('3D')}
              on7D={() => handleGlucoseFilter('7D')}
              on30D={() => handleGlucoseFilter('30D')}
              color='white'
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'space-evenly' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.titleText}>Avg</Text>
              <Text style={styles.subTitleText}>{averageGlucose !== null ? averageGlucose : '---'}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.titleText}>Low</Text>
              <Text style={styles.subTitleText}>{lowestGlucose !== null ? lowestGlucose : '---'}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.titleText}>High</Text>
              <Text style={styles.subTitleText}>{highestGlucose !== null ? highestGlucose : '---'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity
              style={{ borderColor: 'white', borderWidth: 1, borderRadius: 8, width: '32%', padding: 8, alignItems:'center' }} 
              onPress={handleA1CPress}
            >
              <A1CComponent key={refreshA1C} user={user} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ backgroundColor: '#f5f5f5', flex: 1, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <View style={{ padding: 16, alignItems: 'flex-end' }}>
            <PopupMenu
              type='home'
              onDisplayAll={() => handleFilterType('Display all')}
              onGlucose={() => handleFilterType('glucose')}
              onMeal={() => handleFilterType('meal')}
              onMedicine={() => handleFilterType('medicine')}
            />
          </View>
          {logs.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>Input data to get started</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{color: 'blue', fontFamily: 'Poppins-SemiBold', fontSize: 18}}>Create Here</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id}
              renderItem={renderLogItem}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
              contentContainerStyle={styles.section}
            />
          )}
        </View>
      </View>
      <BottomSheetModal 
      isVisible={isModalVisible}
      onClose={()=> setModalVisible(false)}/>
      {/* A1C Modal */}
      <Modal
        isVisible={isA1CModalVisible}
        onBackdropPress={() => setA1CModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Your estimated A1c</Text>
          
          {/* Add content for your A1C modal here */}
          <Text style={styles.modalBoldText}>Insufficient data</Text>
          <Text style={styles.modalText}>Currently you do not have enough glucose logs for us to provide you with an accurante estimated A1c reading. </Text>
          <Text style={styles.modalBoldText}>How to get it</Text>
          <Text style={styles.modalText}>Log at least 21 blood sugar values over the past 3 months in order to get your estimated A1c.</Text>
          <TouchableOpacity onPress={() => setA1CModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isA1CModalVisible1}
        onBackdropPress={() => setA1CModalVisible1(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle1}>Your estimated A1c</Text>
          <View style = {{flexDirection: 'row'}}>
          <Text style={styles.a1cReading}>{a1c}</Text>
          <Text style = {{fontSize: 30, paddingTop: 20}}>%</Text>
          </View>
          {/* Add content for your A1C modal here */}
          <Text style={styles.modalBoldText}>Insight</Text>
          <Text style={styles.modalText}>{a1cMessage}</Text>
          <TouchableOpacity onPress={() => setA1CModalVisible1(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E58B68'
  },
  headerArea: {
    padding: 16
  },
  titleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'white'
  },
  subTitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white'
  },
  sectionHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    backgroundColor: '#f5f5f5',
    color:'#808080',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 24,
    borderColor:'#808080',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 16
  },
  buttonText2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 16,
    color: '#808080',
   
  },
  a1cMenuButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center'
  },
  a1cButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'white'
  },
  menuOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    padding: 8,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noDataText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#808080',
    paddingHorizontal: 10
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: '#E58B68',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 16,
  },
  modalTitle1: {
    color: '#E58B68',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 16,
  },
  modalBoldText: {
    paddingHorizontal: 10,
    alignSelf:'flex-start',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: 2,
  },

  modalText: {
    paddingHorizontal: 10,
    alignSelf:'flex-start',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingBottom: 10,
    
  },

  a1cReading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 80,
    marginBottom: 10,
  },

  closeButton: {
    marginTop: 12,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E58B68',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  }
}
);
