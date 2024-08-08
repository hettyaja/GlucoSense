import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { db } from '../../../firebase'; // Ensure this path is correct
import Header from '../../components/Header';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import ViewValueableDataController from '../../Controller/ViewValuableDataController';
import { useAuth } from '../../service/AuthContext';

const InsightSA = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [premiumUsers, setPremiumUsers] = useState(0);
  const [totalPartnerships, setTotalPartnerships] = useState(0);
  const [activePartnerships, setActivePartnerships] = useState(0);
  const [pendingPartnerships, setPendingPartnerships] = useState(0);
  const [logsCount, setLogsCount] = useState({
    totalGlucoseLogsCount: 0,
    totalMedicineLogsCount: 0,
    totalMealLogsCount: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLogsCount(await ViewValueableDataController.viewValuableData());
        setTotalUsers(await ViewValueableDataController.viewTotalUser());
        setActiveUsers(await ViewValueableDataController.viewActiveUser());
        setPremiumUsers(await ViewValueableDataController.viewPremiumUser());
        setTotalPartnerships(await ViewValueableDataController.viewTotalPartnership());
        setActivePartnerships(await ViewValueableDataController.viewActivePartnership());
        setPendingPartnerships(await ViewValueableDataController.viewPendingPartnership());
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={80} color="#E68B67" />
      </View>
    );
  }

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
            <Text style={styles.cardValue}>{activeUsers}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Premium User</Text>
            <Text style={styles.cardValue}>{premiumUsers}</Text>
          </View>
        </View>
        <Text style={styles.title}>Partnership Statistics</Text>
        <View style={styles.userCard}>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Total Partnership</Text>
            <Text style={styles.cardValue}>{totalPartnerships}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Active Partnership</Text>
            <Text style={styles.cardValue}>{activePartnerships}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.userSection}>
            <Text style={styles.cardTitle}>Pending Partnership</Text>
            <Text style={styles.cardValue}>{pendingPartnerships}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InsightSA;
