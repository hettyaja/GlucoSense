import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Tabs, router, useFocusEffect } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../service/AuthContext';
import RetrieveGlucoseLogsController from '../../Controller/RetrieveGlucoseLogsController';
import RetrieveMealLogsController from '../../Controller/RetrieveMealLogsController';
import Header from '../../components/Header';
import * as d3 from 'd3';

const Insight = () => {
  const [subscriptionType, setSubscriptionType] = useState('');
  const screenHeight = 220;
  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [glucoseGraphData, setGlucoseGraphData] = useState(null);
  const [mealGraphData, setMealGraphData] = useState(null);
  const [scatterGraphData, setScatterGraphData] = useState({
    data: [],
    xScale: null,
    yScale: null,
    xTicks: [],
    yTicks: [],
    trendLine: { x1: 0, y1: 0, x2: 0, y2: 0 }
  });
  const [loading, setLoading] = useState(true);

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

    return {
      data,
      xScale,
      yScale,
      xTicks: xScale.ticks(6),
      yTicks: yScale.ticks(6),
      trendLine
    };
  };

  const fetchProfileData = async () => {
    try {
      const profileData = await getProfileController.getProfile(user.uid);
      setSubscriptionType(profileData.subscriptionType);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {

      if (user.uid) {
        fetchProfileData();
      }
      const prepareDataForGraphs = async () => {
        try {
          const glucoseData = await RetrieveGlucoseLogsController.retrieveGlucoseLogs(user.uid);
          const mealData = await RetrieveMealLogsController.retrieveMealLogs(user.uid);
          const combinedData = combineGlucoseAndMealData(glucoseData, mealData);
          setGlucoseGraphData(glucoseData);
          setMealGraphData(mealData);
          setScatterGraphData(combinedData);
        } catch (error) {
          console.error('Error preparing data for graphs:', error);
        } finally {
          setLoading(false);
        }
      };

      if (user.uid) {
        prepareDataForGraphs();
      }
    }, [user.uid])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E68B67" />
      </View>
    );
  }

  const { data, xScale, yScale, xTicks, yTicks, trendLine } = scatterGraphData;

  return (
    <>
      <Header title='Insight' />
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.centeredChart} onPress={() => router.push('/glucoseInsight')}>
          <View style={styles.chartContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15 }}>
              <Text style={styles.chartTitle}>Blood Glucose</Text>
              <AntDesign name="right" size={16} />
            </View>
            <LineChart
              data={glucoseGraphData}
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
        </TouchableOpacity>
        <TouchableOpacity style={styles.centeredChart} onPress={() => router.push('/caloriesInsight')}>
          <View style={styles.chartContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15 }}>
              <Text style={styles.chartTitle}>Calorie Consumption</Text>
              <AntDesign name="right" size={16} />
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
        </TouchableOpacity>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 20 }}/>
      </ScrollView>
    </>
  );
};

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
  scatterChartContainer: {
    backgroundColor: 'white',
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Insight;
