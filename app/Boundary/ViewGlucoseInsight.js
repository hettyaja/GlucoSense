import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator} from 'react-native';
import { Tabs, router } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { useAuth } from '../service/AuthContext';
import RetrieveGlucoseLogsController from '../Controller/RetrieveGlucoseLogsController';
import RetrieveGlucoseLogsController1 from '../Controller/RetrieveGlucoseLogsController1';
import Header from '../components/Header';
import ViewUserGoalsController from '../Controller/ViewUserGoalsController';

const Insight = () => {
  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [glucoseGraphData, setGlucoseGraphData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [loading, setLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState({ average: null, low: null, high: null });
  const [weeklyStats, setWeeklyStats] = useState({ average: null, low: null, high: null });
  const [monthlyStats, setMonthlyStats] = useState({ average: null, low: null, high: null });

  const handleBackButton = () => {
    router.back()
  }
  
  useEffect(() => {
    const calculateStats = (logs) => {
      if (logs.length === 0) {
        return { average: null, low: null, high: null };
      }
      const values = logs.map(log => parseFloat(log.glucose));
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      const low = Math.min(...values);
      const high = Math.max(...values);
      return { average, low, high };
    };

    const prepareDataForGraphs = async () => {
      try {
        const userGoals = await ViewUserGoalsController.viewUserGoals(user.uid);
        const lowerGoal = userGoals.goals.glucoseGoals.afterMealLowerBound;
        const upperGoal = userGoals.goals.glucoseGoals.afterMealUpperBound;
        const glucoseData = await RetrieveGlucoseLogsController.retrieveGlucoseLogs(user.uid);
        const goalData1 = {
          labels: glucoseData.labels,
          datasets: [
            ...glucoseData.datasets,
            {
              data: Array(glucoseData.labels.length).fill(lowerGoal),
              color: () => `green`, // Green line for lowerGoal
              withDots: false,
              fillShadowGradient: '#ffffff',
              fillShadowGradientTo: '#ffffff',
              fillShadowGradientOpacity: 0, // No gradient
            },
            {
              data: Array(glucoseData.labels.length).fill(upperGoal),
              color: () => `green`, // Green line for upperGoal
              withDots: false,
              fillShadowGradient: '#ffffff',
              fillShadowGradientTo: '#ffffff',
              fillShadowGradientOpacity: 0, // No gradient
            },
          ],
        };
        
        setGlucoseGraphData(goalData1);

        const dailyLogs = await RetrieveGlucoseLogsController1.retrieveGlucoseLogs(user.uid, 'daily');
        setDailyStats(calculateStats(dailyLogs));

        const weeklyLogs = await RetrieveGlucoseLogsController1.retrieveGlucoseLogs(user.uid, 'weekly');
        setWeeklyStats(calculateStats(weeklyLogs));

        const monthlyLogs = await RetrieveGlucoseLogsController1.retrieveGlucoseLogs(user.uid, 'monthly');
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
    return (<View style={[styles.containerGif, styles.background]}>
      <ActivityIndicator size='large' color='#E58B68' />
    </View>
    )
  }

  return (
    <>
      <Header
        title= 'Glucose Insight'
        leftButton = 'Back'
        onLeftButtonPress={()=> handleBackButton()}
      />

      <ScrollView style={styles.container}>
        <View style={styles.centeredChart}>
          <View style={styles.chartContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15 }}>
              <Text style={styles.chartTitle}>Blood Glucose</Text>
            </View>
            <LineChart
              data={glucoseGraphData}
              width={screenWidth}
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
                fillShadowGradient: '#ffffff',
                fillShadowGradientTo: '#ffffff',
                fillShadowGradientOpacity: 0, // No gradient
                propsForDots: {
                  r: "6",
                  strokeWidth: "1",
                }
              }}
              style={{
                marginVertical: 8,
              }}
            />
            <Text style = {styles.graphExplaination}>Daily average glucose readings for the last 7 days</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style = {{backgroundColor: 'white', justifyContent: 'flex-end', paddingBottom: 10}}>
          <Text style={styles.statsHeader}>Last 24 hours</Text>
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
          </View>
          <View style = {{backgroundColor: 'white', justifyContent: 'flex-end', marginTop:16, paddingBottom: 10}}>
          <Text style={styles.statsHeader}>Last 7 days</Text>
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
          </View>
          <View style = {{backgroundColor: 'white', justifyContent: 'flex-end',  marginTop:16, paddingBottom: 10}}>
          <Text style={styles.statsHeader}>Last 30 days</Text>
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
    padding: 10,
  },
  statsContainer: {
    paddingVertical: 16,
  },
  statsHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'black',
    marginTop: 20,
    paddingLeft: 16,
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

  containerGif: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGif: {
    width: 100,
    height: 100,
  },

  background:{
    flex:1,
    backgroundColor: 'white'
  },
  graphExplaination: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
  }
});
