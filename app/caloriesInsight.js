import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { useAuth } from './service/AuthContext';
import RetrieveMealLogsController from './Controller/RetrieveMealLogsController';
import RetrieveMealLogsController1 from './Controller/RetrieveMealLogsController1';

const Insight = () => {
  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [mealGraphData, setMealGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState({ average: null, low: null, high: null });
  const [weeklyStats, setWeeklyStats] = useState({ average: null, low: null, high: null });
  const [monthlyStats, setMonthlyStats] = useState({ average: null, low: null, high: null });
  

  useEffect(() => {
    const calculateStats = (logs) => {
      if (logs.length === 0) {
        return { average: null, low: null, high: null };
      }
      const values = logs.map(log => parseFloat(log.calories));
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      const low = Math.min(...values);
      const high = Math.max(...values);
      return { average, low, high };
    };

    const prepareDataForGraphs = async () => {
      try {
        const mealData = await RetrieveMealLogsController.retrieveMealLogs(user.uid);
        setMealGraphData(mealData ? mealData : { labels: [], datasets: [{ data: [] }] });

        const dailyLogs = await RetrieveMealLogsController1.retrieveMealLogs(user.uid, 'daily');
        setDailyStats(calculateStats(dailyLogs));

        const weeklyLogs = await RetrieveMealLogsController1.retrieveMealLogs(user.uid, 'weekly');
        setWeeklyStats(calculateStats(weeklyLogs));

        const monthlyLogs = await RetrieveMealLogsController1.retrieveMealLogs(user.uid, 'monthly');
        setMonthlyStats(calculateStats(monthlyLogs));
      } catch (error) {
        console.error('Error preparing data for graphs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user.uid) {
      prepareDataForGraphs();
    }
  }, [user.uid]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log('Graph data in component:', mealGraphData);

  return (
    <>
      <Tabs.Screen options={{
        title: 'Calories Insight',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerTitle: 'Calories Insight',
        headerTitleAlign: 'center',
      }} />
      <ScrollView style={styles.container}>
      <View style={styles.centeredChart}>
          <View style = {styles.chartContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15}}>
              <Text style={styles.chartTitle}>Calorie Consumption</Text>
            </View>
            <LineChart
            data={mealGraphData}
            width={Dimensions.get('window').width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "1",
              }
            }}
            
            style={{
              marginVertical: 8,

            }}
          />
            </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsHeader}>Daily Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>Avg</Text>
              <Text style={styles.subTitleText}>{dailyStats.average !== null ? dailyStats.average.toFixed(2) : '---'}</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>Low</Text>
              <Text style={styles.subTitleText}>{dailyStats.low !== null ? dailyStats.low : '---'}</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>High</Text>
              <Text style={styles.subTitleText}>{dailyStats.high !== null ? dailyStats.high : '---'}</Text>
            </View>
          </View>

          <Text style={styles.statsHeader}>Weekly Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>Avg</Text>
              <Text style={styles.subTitleText}>{weeklyStats.average !== null ? weeklyStats.average.toFixed(2) : '---'}</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>Low</Text>
              <Text style={styles.subTitleText}>{weeklyStats.low !== null ? weeklyStats.low : '---'}</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>High</Text>
              <Text style={styles.subTitleText}>{weeklyStats.high !== null ? weeklyStats.high : '---'}</Text>
            </View>
          </View>

          <Text style={styles.statsHeader}>Monthly Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>Avg</Text>
              <Text style={styles.subTitleText}>{monthlyStats.average !== null ? monthlyStats.average.toFixed(2) : '---'}</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>Low</Text>
              <Text style={styles.subTitleText}>{monthlyStats.low !== null ? monthlyStats.low : '---'}</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.titleText}>High</Text>
              <Text style={styles.subTitleText}>{monthlyStats.high !== null ? monthlyStats.high : '---'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default Insight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centeredChart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  chartTitle: {
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  chartContainer: {
    backgroundColor: 'white',
  },
  statsContainer: {
    padding: 16,
  },
  statsHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  statsBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'black',
  },
  subTitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'black',
  },
});