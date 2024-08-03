import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Tabs, router } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
//import { ScatterChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import { Circle, G } from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../service/AuthContext';
import RetrieveGlucoseLogsController from '../../Controller/RetrieveGlucoseLogsController';
import RetrieveMealLogsController from '../../Controller/RetrieveMealLogsController';
import Header from '../../components/Header';

const Insight = () => {
  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [glucoseGraphData, setGlucoseGraphData] = useState(null);
  const [mealGraphData, setMealGraphData] = useState(null);
  const [scatterGraphData, setScatterGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareDataForGraphs = async () => {
      try {
        const glucoseData = await RetrieveGlucoseLogsController.retrieveGlucoseLogs(user.uid);
        console.log('Blood Glucose data:', glucoseData);
        setGlucoseGraphData(glucoseData);

        const mealData = await RetrieveMealLogsController.retrieveMealLogs(user.uid);
        console.log('Calorie Consumption data:', mealData);
        setMealGraphData(mealData);

        // Combine data for scatter plot
        const combinedData = combineGlucoseAndMealData(glucoseData, mealData);
        console.log('Combined Scatter Data:', combinedData);  // Log combined data
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
  }, [user.uid]);

  const combineGlucoseAndMealData = (glucoseData, mealData) => {
    const combinedData = [];
    const glucoseEntries = glucoseData.datasets[0].data;
    const mealEntries = mealData.datasets[0].data;

    for (let i = 0; i < glucoseEntries.length; i++) {
      combinedData.push({
        x: mealEntries[i],
        y: glucoseEntries[i]
      });
    }

    return combinedData;
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log('Glucose Graph Data:', glucoseGraphData);
  console.log('Meal Graph Data:', mealGraphData);
  console.log('Scatter Graph Data:', scatterGraphData);

  return (
    <>
      <Header
        title = 'Insight'
      />

      
      {/* <Tabs.Screen options={{
        title: 'Insight',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Medium', fontSize:16 },
        headerTitle: 'Insight',
        headerTitleAlign: 'center',
      }} /> */}
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
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 16,
  },
  chartContainer: {
    backgroundColor: 'white',
  }
});
