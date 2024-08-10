// caloriesInsight.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native'; // Use hooks
import { useAuth } from './service/AuthContext';
import RetrieveMealLogsController from './Controller/RetrieveMealLogsController';
import RetrieveMealLogsController1 from './Controller/RetrieveMealLogsController1';
import Header from './components/Header';
import UserGoalsController from './Controller/UserGoalsController';

const CaloriesInsight = () => {
  const navigation = useNavigation(); // Hook to get navigation
  const route = useRoute(); // Hook to get route

  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [mealGraphData, setMealGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState({ average: null, low: null, high: null });
  const [weeklyStats, setWeeklyStats] = useState({ average: null, low: null, high: null });
  const [monthlyStats, setMonthlyStats] = useState({ average: null, low: null, high: null });
  const [caloriesConsumed, setCaloriesConsumed] = useState();
  const [BMRCalorieGoal, setBMRCalorieGoal] = useState();
  const [customCalorieGoal, setCustomCalorieGoal] = useState()

  const handleBackButton = () => {
    // This will navigate back to the previous screen in the stack, which should be the main Insight page
    navigation.goBack();
  };

  useEffect(() => {
    const calculateStats = (logs) => {
      if (logs.length === 0) {
        return { average: null, low: null, high: null };
      }
      const values = logs.map(log => parseFloat(log.calories));
      const sum = values.reduce((sum, value) => sum + value, 0)
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      const low = Math.min(...values);
      const high = Math.max(...values);
      return { average, low, high, sum };
    };

    const prepareDataForGraphs = async () => {
      try {
        const userGoals = await UserGoalsController.fetchUserGoals(user.uid);
        setBMRCalorieGoal(userGoals.goals.BMRGoals.calorieGoals);
        setCustomCalorieGoal(userGoals.goals.customGoals.calorieGoals || 0);

        const mealData = await RetrieveMealLogsController.retrieveMealLogs(user.uid);
        setMealGraphData(mealData ? mealData : { labels: [], datasets: [{ data: [] }] });

        const dailyLogs = await RetrieveMealLogsController1.retrieveMealLogs(user.uid, 'daily');
        setDailyStats(calculateStats(dailyLogs));
        setCaloriesConsumed(calculateStats(dailyLogs).sum || 0)

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
    return (
      <View style={[styles.containerGif, styles.background]}>
        <Image
          source={require('../app/assets/loading.gif')}
          style={styles.imageGif}
        />
      </View>
    );
  }

  return (
    <>
      <Header
        title='Calories Insight'
        leftButton='Back'
        onLeftButtonPress={handleBackButton} // Use the back button handler
      />
      <ScrollView style={styles.container}>
        <View style={styles.centeredChart}>
          <View style={styles.chartContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15 }}>
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
          {/* Calories Burned Card */}
          <View style={{flexDirection:'row', justifyContent:'center'}}>
          <View style={styles.caloriesBurnedContainer}>
            <Text style={styles.caloriesBurnedHeader}>Calories Goals (BMR)</Text>
            <Text style={styles.caloriesBurnedText}>{`${caloriesConsumed} / ${BMRCalorieGoal}`}</Text>
            <Text style={[styles.caloriesBurnedText, {marginBottom:8, fontFamily:'Poppins-Regular'}]}>kcal</Text>
          </View>
          <View style={styles.caloriesBurnedContainer}>
            <Text style={styles.caloriesBurnedHeader}>Calories Goals (Custom)</Text>
            <Text style={styles.caloriesBurnedText}>{`${caloriesConsumed} / ${customCalorieGoal}`}</Text>
            <Text style={[styles.caloriesBurnedText, {marginBottom:8, fontFamily:'Poppins-Regular'}]}>kcal</Text>
          </View>
          </View>
        <View style={styles.statsContainer}>
          <View style={{ backgroundColor: 'white', justifyContent: 'flex-end', paddingBottom: 10 }}>
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
          </View>
          <View style={{ backgroundColor: 'white', justifyContent: 'flex-end', marginTop: 16, paddingBottom: 10 }}>
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
          </View>
          <View style={{ backgroundColor: 'white', justifyContent: 'flex-end', marginTop: 16, paddingBottom: 10 }}>
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


        </View>
      </ScrollView>
    </>
  );
};

export default CaloriesInsight;

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
    paddingVertical: 16,
  },
  statsHeader: {
    paddingLeft: 16,
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
  containerGif: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGif: {
    width: 100,
    height: 100,
  },
  background: {
    backgroundColor: 'white'
  },
  caloriesBurnedContainer: {
    backgroundColor: '#FFF', // White background
    padding: 8,
    marginHorizontal:8,
    marginTop: 16,
    borderRadius: 8,
    elevation: 5,
    width:'45%'
  },
  caloriesBurnedHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 8,
  },
  caloriesBurnedText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
