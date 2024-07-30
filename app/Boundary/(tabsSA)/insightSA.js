import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Ensure this path is correct
import Header from '../../components/Header';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import ViewValueableDataController from '../../Controller/ViewValuableDataController';

const InsightSA = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [logsCount, setLogsCount] = useState({
    totalGlucoseLogsCount: 0,
    totalMedicineLogsCount: 0,
    totalMealLogsCount: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const logsCountData = await ViewValueableDataController.viewValuableData();
        setLogsCount(logsCountData);

        const collections = ['users', 'businessPartner', 'systemAdmin'];
        let usersCount = 0;
        let activeUsersCount = 0;

        for (const collectionName of collections) {
          const querySnapshot = await getDocs(collection(db, collectionName));
          querySnapshot.forEach((doc) => {
            usersCount++;
            if (doc.data().status === 'active') {
              activeUsersCount++;
            }
          });
        }

        setTotalUsers(usersCount);
        setTotalActiveUsers(activeUsersCount);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const data = [
    {
      name: 'Glucose Logs',
      population: logsCount.totalGlucoseLogsCount,
      color: '#E68B67',
      legendFontColor: '#7f7f7f',
      legendFontSize: 15,
    },
    {
      name: 'Medicine Logs',
      population: logsCount.totalMedicineLogsCount,
      color: '#077167',
      legendFontColor: '#7f7f7f',
      legendFontSize: 15,
    },
    {
      name: 'Meal Logs',
      population: logsCount.totalMealLogsCount,
      color: '#FAF5E0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <>
      <Header title="Insight" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>User Statistics</Text>
        <View style={styles.userCard}>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Total User</Text>
            <Text style={styles.cardValue}>{totalUsers}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Active User</Text>
            <Text style={styles.cardValue}>{totalActiveUsers}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Premium User</Text>
            <Text style={styles.cardValue}>{totalUsers}</Text>
          </View>
        </View>
        <Text style={styles.title}>Partnership Statistics</Text>
        <View style={styles.userCard}>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Total Partnership</Text>
            <Text style={styles.cardValue}>{totalUsers}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Active Partnership</Text>
            <Text style={styles.cardValue}>{totalActiveUsers}</Text>
          </View>
        </View>
        <Text style={styles.title}>Logs Statistics</Text>
        <View style={styles.userCard}>
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 32}
          height={160}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          absolute
        />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-evenly',
    elevation: 4,
    marginBottom: 8,
  },
  userSection: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    borderRightWidth: 1,
    borderColor: 'grey',
    marginVertical: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    color: 'grey',
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default InsightSA;
