import React, { useState, useEffect } from 'react';
import { Svg, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native'; // Use hooks
import { useAuth } from './service/AuthContext';
import RetrieveMealLogsController from './Controller/RetrieveMealLogsController';
import RetrieveMealLogsController1 from './Controller/RetrieveMealLogsController1';
import RetrieveGlucoseLogsController from './Controller/RetrieveGlucoseLogsController';
import RetrieveGlucoseLogsController1 from './Controller/RetrieveGlucoseLogsController1';
import Header from './components/Header';
import ViewUserGoalsController from './Controller/ViewUserGoalsController';
import * as d3 from 'd3';

const CaloriesInsight = () => {
  const navigation = useNavigation(); // Hook to get navigation
  const route = useRoute(); // Hook to get route

  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [mealGraphData, setMealGraphData] = useState(null);
  const [glucoseGraphData, setGlucoseGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklyGlucoseStats, setWeeklyGlucoseStats] = useState({ average: null, low: null, high: null });
  const [weeklyMealStats, setWeeklyMealStats] = useState({ average: null, low: null, high: null });
  const [caloriesConsumed, setCaloriesConsumed] = useState();
  const [calorieGoal, setCalorieGoal] = useState();
  const [correlationCoefficient, setCorrelationCoefficient] = useState();

  const handleBackButton = () => {
    // This will navigate back to the previous screen in the stack, which should be the main Insight page
    navigation.goBack();
  };
  const screenHeight = 220;
  const [scatterGraphData, setScatterGraphData] = useState({
    data: [],
    xScale: null,
    yScale: null,
    xTicks: [],
    yTicks: [],
    trendLine: { x1: 0, y1: 0, x2: 0, y2: 0 }
  });

  const calculateCorrelationCoefficient = (xValues, yValues) => {
    const n = xValues.length;
    const sumX = d3.sum(xValues);
    const sumY = d3.sum(yValues);
    const sumXY = d3.sum(xValues.map((x, i) => x * yValues[i]));
    const sumX2 = d3.sum(xValues.map(x => x * x));
    const sumY2 = d3.sum(yValues.map(y => y * y));

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return numerator / denominator;
  };

  const getCorrelationMessage = (coefficient) => {
    if (coefficient > 0.8) {
      return "Our calculations suggest there is a strong correlation between calorie consumption and blood glucose levels in regards to your body.";
    } else if (coefficient > 0.5) {
      return "Our calculations suggest there is a moderate positive correlation between calorie consumption and blood glucose levels in regards to your body.";
    } else if (coefficient > 0.3) {
      return "Our calculations suggest there is a weak positive correlation between calorie consumption and blood glucose levels in regards to your body.";
    } else if (coefficient > -0.3) {
      return "Our calculations suggest there is little to no correlation between calorie consumption and blood glucose levels in regards to your body.";
    } else if (coefficient > -0.5) {
      return "Our calculations suggest there is a weak negative correlation between calorie consumption and blood glucose levels in regards to your body.";
    } else if (coefficient > -0.8) {
      return "Our calculations suggest there is a moderate negative correlation between calorie consumption and blood glucose levels in regards to your body.";
    } else {
      return "Our calculations suggest there is a strong negative correlation between calorie consumption and blood glucose levels in regards to your body.";
    }
  };

  const combineGlucoseAndMealData = (glucoseData, mealData) => {
    const xValues = mealData.datasets[0].data;
    const yValues = glucoseData.datasets[0].data;
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(xValues)])  // Ensure 0 is included in the domain
      .range([40, screenWidth - 40]); // Increased padding for axis labels
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(yValues)])  // Ensure 0 is included in the domain
      .range([screenHeight - 40, 20]); // Invert y axis to show higher values at the top

    const data = xValues.map((x, index) => ({
      x: xScale(x),
      y: yScale(yValues[index]),
    }));

    // Calculate trend line
    const n = xValues.length;
    const sumX = d3.sum(xValues);
    const sumY = d3.sum(yValues);
    const sumXY = d3.sum(xValues.map((x, i) => x * yValues[i]));
    const sumX2 = d3.sum(xValues.map(x => x * x));

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const x1 = d3.min(xValues);
    const x2 = d3.max(xValues);
    const y1 = slope * x1 + intercept;
    const y2 = slope * x2 + intercept;

    const trendLine = {
      x1: xScale(x1),
      y1: yScale(y1),
      x2: xScale(x2),
      y2: yScale(y2)
    };

    const correlationCoefficient = calculateCorrelationCoefficient(xValues, yValues);

    return {
      data,
      xScale,
      yScale,
      xTicks: xScale.ticks(6),
      yTicks: yScale.ticks(6),
      trendLine,
      correlationCoefficient
    };
  };

  useEffect(() => {
    const calculateMealStats = (logs) => {
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

    const calculateGlucoseStats = (logs) => {
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

        // Fetch only the default calorie goal
        const calorieGoal = userGoals.goals.BMRGoals.default
          ? userGoals.goals.BMRGoals.calorieGoals
          : userGoals.goals.customGoals.calorieGoals;

        setCalorieGoal(calorieGoal); // Set the calorie goal

        const mealData = await RetrieveMealLogsController.retrieveMealLogs(user.uid);
        setMealGraphData(mealData ? mealData : { labels: [], datasets: [{ data: [] }] });
        const glucoseData = await RetrieveGlucoseLogsController.retrieveGlucoseLogs(user.uid);
        setGlucoseGraphData(glucoseData ? glucoseData : { labels: [], datasets: [{ data: [] }] });
        const combinedData = combineGlucoseAndMealData(glucoseData, mealData);
        setScatterGraphData(combinedData);
        setCorrelationCoefficient(combinedData.correlationCoefficient);
        const weeklyMealLogs = await RetrieveMealLogsController1.retrieveMealLogs(user.uid, 'weekly');
        setWeeklyMealStats(calculateMealStats(weeklyMealLogs));
        const weeklyGlucoseLogs = await RetrieveGlucoseLogsController1.retrieveGlucoseLogs(user.uid, 'weekly');
        setWeeklyGlucoseStats(calculateGlucoseStats(weeklyGlucoseLogs));
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
  const { data, xScale, yScale, xTicks, yTicks, trendLine } = scatterGraphData;
  const correlationMessage = getCorrelationMessage(correlationCoefficient);

  return (
    <>
      <Header
        title='Correlation Insight'
        leftButton='Back'
        onLeftButtonPress={handleBackButton} // Use the back button handler
      />
      <ScrollView style={styles.container}>
        <View style={styles.centeredChart}>
          <View style={styles.chartContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15 }}>
              <Text style={styles.chartTitle}>Correlation Graph (Past 7 Days)</Text>
            </View>
            <Svg height={screenHeight + 40} width={screenWidth - 10} style={styles.scatterChartContainer}>
              {/* Add horizontal and vertical axes lines */}
              <Line x1="40" y1={screenHeight - 40} x2={screenWidth - 40} y2={screenHeight - 40} stroke="grey" strokeWidth="2" />
              <Line x1="40" y1="20" x2="40" y2={screenHeight - 40} stroke="grey" strokeWidth="2" />
              {data.map((point, index) => (
                <Circle key={index} cx={point.x} cy={point.y} r="6" fill="black" />
              ))}
              {/* Add trend line */}
              <Line x1={trendLine.x1} y1={trendLine.y1} x2={trendLine.x2} y2={trendLine.y2} stroke="#E58B68" strokeWidth="2" />
              {/* Add grid lines */}
              {xTicks.map((tick, index) => (
                <Line key={index} x1={xScale(tick)} y1="20" x2={xScale(tick)} y2={screenHeight - 40} stroke="grey" strokeDasharray="4, 4" />
              ))}
              {yTicks.map((tick, index) => (
                <Line key={index} x1="40" y1={yScale(tick)} x2={screenWidth - 40} y2={yScale(tick)} stroke="grey" strokeDasharray="4, 4" />
              ))}

              {/* Axes labels */}
              <SvgText fill="black" fontSize="12" x={screenWidth / 2} y={screenHeight} textAnchor="middle">Calories</SvgText>
              <SvgText fill="black" fontSize="12" x="12" y={screenHeight / 2} textAnchor="middle" transform={`rotate(-90 10 ${screenHeight / 2})`}>Glucose (mg/dL)</SvgText>
              {/* Numeric labels for ticks */}
              {xTicks && xTicks.map((tick, index) => (
                <G key={index}>
                  <Line x1={xScale(tick)} y1={screenHeight - 40} x2={xScale(tick)} y2={screenHeight - 30} stroke="black" />
                  <SvgText x={xScale(tick)} y={screenHeight - 20} fill="black" fontSize="12" textAnchor="middle">{tick}</SvgText>
                </G>
              ))}
              {yTicks && yTicks.map((tick, index) => (
                <G key={index}>
                  <Line x1="30" y1={yScale(tick)} x2="30" y2={yScale(tick)} stroke="black" />
                  <SvgText x="30" y={yScale(tick) + 5} fill="black" fontSize="12" textAnchor="end">{tick}</SvgText>
                </G>
              ))}
            </Svg>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={{ backgroundColor: 'white', justifyContent: 'center', paddingBottom: 10 }}>
            <Text style={styles.statsHeader1}>Correlation Coefficient</Text>
            <Text style={styles.subTitleText1}>{correlationCoefficient ? correlationCoefficient.toFixed(2) : 'N/A'}</Text>
            <Text style={styles.correlationMessage}>{correlationMessage}</Text>
          </View>
          <View style={{ backgroundColor: 'white', justifyContent: 'flex-end', marginTop: 16, paddingBottom: 10 }}>
            <Text style={styles.statsHeader}>Last 7 days glucose statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statsBox}>
                <Text style={styles.titleText}>Avg</Text>
                <Text style={styles.subTitleText}>{weeklyGlucoseStats.average !== null ? weeklyGlucoseStats.average.toFixed(2) : '---'}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.titleText}>Low</Text>
                <Text style={styles.subTitleText}>{weeklyGlucoseStats.low !== null ? weeklyGlucoseStats.low : '---'}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.titleText}>High</Text>
                <Text style={styles.subTitleText}>{weeklyGlucoseStats.high !== null ? weeklyGlucoseStats.high : '---'}</Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: 'white', justifyContent: 'flex-end', marginTop: 16, paddingBottom: 10 }}>
            <Text style={styles.statsHeader}>Last 7 days calorie statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statsBox}>
                <Text style={styles.titleText}>Avg</Text>
                <Text style={styles.subTitleText}>{weeklyMealStats.average !== null ? weeklyMealStats.average.toFixed(2) : '---'}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.titleText}>Low</Text>
                <Text style={styles.subTitleText}>{weeklyMealStats.low !== null ? weeklyMealStats.low : '---'}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.titleText}>High</Text>
                <Text style={styles.subTitleText}>{weeklyMealStats.high !== null ? weeklyMealStats.high : '---'}</Text>
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
  scatterChartContainer: {
    backgroundColor: 'white',

  },
  chartContainer: {
    padding: 10,
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
  statsHeader1: {
    alignSelf: 'center',
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
  subTitleText1: {
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
  },
  correlationMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginTop: 16,
    borderRadius: 8,
    elevation: 5,
    width: '50%'
  },
  caloriesBurnedHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  caloriesBurnedText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

