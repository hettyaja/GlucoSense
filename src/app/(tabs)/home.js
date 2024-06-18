import { View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../context/authContext';
import Header from '../../components/Header';
import { fetchLogs } from '../service/diaryService';
import PopupMenu from '../../components/PopupMenu';
import Divider from '../../components/Divider';

const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
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
    const date = formatDate(log.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {});
};

const home = () => {
  const { user } = useAuth();
  const [dateType, setDateType] = useState('Today');
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const fetchAllLogs = async () => {
      if (user) {
        try {
          const [mealLogs, glucoseLogs, medicineLogs] = await Promise.all([
            fetchLogs(user.uid, 'mealLogs', 10),
            fetchLogs(user.uid, 'glucoseLogs', 10),
            fetchLogs(user.uid, 'medicineLogs', 10),
          ]);

          const combinedLogs = [
            ...mealLogs.map(log => ({ ...log, type: 'meal' })),
            ...glucoseLogs.map(log => ({ ...log, type: 'glucose' })),
            ...medicineLogs.map(log => ({ ...log, type: 'medicine' })),
          ].sort((a, b) => b.timestamp.seconds - a.timestamp.seconds); // Sort logs by timestamp

          setLogs(combinedLogs);
          setFilteredLogs(combinedLogs);
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      }
    };

    fetchAllLogs();
  }, [user]);

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
        {medicineName}: {unit}
      </Text>
    ));
  };

  const renderLogItem = ({ item, index, section }) => (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(item.type === 'glucose' ? 'editGlucose' : item.type === 'medicine' ? 'editMeds' : 'editMeal')}
      >
        {item.type === 'glucose' && <Fontisto name='blood-drop' size={24} color='black' style={{ paddingRight: 16 }} />}
        {item.type === 'medicine' && <Fontisto name='pills' size={24} color='black' style={{ paddingRight: 8 }} />}
        {item.type === 'meal' && <MaterialCommunityIcons name='food' size={24} color='black' style={{ paddingRight: 8 }} />}
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingRight: 8 }}>
          <View>
            {item.type === 'medicine' ? (
              renderMedicineDetails(item.medicine)
            ) : (
              <Text style={styles.buttonText}>
                {item.type === 'glucose' && `${item.glucoseValue} mmol/L`}
                {item.type === 'meal' && `${item.carbs} Carbs`}
              </Text>
            )}
            <Text style={styles.buttonText2}>{new Date(item.timestamp.seconds * 1000).toLocaleTimeString()}</Text>
          </View>
          <Feather name='more-vertical' size={24} style={{ paddingRight: 16 }} />
        </View>
      </TouchableOpacity>
      {index < section.data.length - 1 && <Divider withMargin={false} />}
    </View>
  );

  return (
    <>
      <Header
        title=''
        leftButton='Home'
        rightButton='Notification'
        onRightButtonPress={() => router.push('reminder')}
      />
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: 'white' }}>Blood Glucose</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setDateModalVisible(true)}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: 'white' }}>{dateType} </Text>
              <AntDesign name='caretdown' size={8} color='white' />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'space-evenly' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.titleText}>Avg</Text>
              <Text style={styles.subTitleText}>---</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.titleText}>Low</Text>
              <Text style={styles.subTitleText}>---</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.titleText}>High</Text>
              <Text style={styles.subTitleText}>---</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity style={{ borderColor: 'white', borderWidth: 1, borderRadius: 8, width: '20%', paddingHorizontal: 8 }} onPress={() => router.push('Subscribe')}>
              <Text style={styles.titleText}>A1C: ~</Text>
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
<<<<<<< HEAD
          <Text style={{fontFamily:'Poppins-SemiBold', fontSize:14, paddingHorizontal:16, paddingBottom:16, color:'#808080'}}>Today</Text>
          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('editGlucose')}>
              <Fontisto name='blood-drop' size={24} color='black' style={{paddingRight:16}}/>
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingRight:8}}>
                <View>
                  <Text style={styles.buttonText}>5.7 mmol/L</Text>
                  <Text style={styles.buttonText2}>1:33 PM</Text>
                </View>
                <Feather name='more-vertical' size={24}/>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
            <TouchableOpacity style={styles.button} onPress={() => router.push('editMeds')}>
              <Fontisto name='pills' size={24} color='black' style={{paddingRight:8}}/>
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingRight:8}}>
                <View>
                  <Text style={styles.buttonText}>2 Pills</Text>
                  <Text style={styles.buttonText2}>1:53 PM</Text>
                </View>
                <Feather name='more-vertical' size={24}/>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons name='food' size={24} color='black' style={{paddingRight:8}}/>
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingRight:8}}>
                <View>
                  <Text style={styles.buttonText}>550 Carbs</Text>
                  <Text style={styles.buttonText2}>1:59 PM</Text>
                </View>
                <Feather name='more-vertical' size={24}/>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
=======
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={renderLogItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            contentContainerStyle={styles.section}
          />
        </View>
>>>>>>> b46c322b3206a2b7bd7687052c23398e0b23f259
      </View>
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
    color: '#808080'
  },
});
