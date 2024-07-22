import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Tabs, router} from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../service/AuthContext';
import RetrieveGlucoseLogsController from '../../Controller/RetrieveGlucoseLogsController';
import RetrieveMealLogsController from '../../Controller/RetrieveMealLogsController';

const Insight = () => {
  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [glucoseGraphData, setGlucoseGraphData] = useState(null);
  const [mealGraphData, setMealGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareDataForGraphs = async () => {
      try {
        const glucoseData = await RetrieveGlucoseLogsController.retrieveGlucoseLogs(user.uid);
        console.log('Graph data to be set:', glucoseData);
        setGlucoseGraphData(glucoseData);

        const mealData = await RetrieveMealLogsController.retrieveMealLogs(user.uid);
        console.log('Graph data to be set:', mealData);
        setMealGraphData(mealData);

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

  console.log('Graph data in component:', glucoseGraphData);
  console.log('Graph data in component:', mealGraphData);

  const chartConfig = {
    backgroundGradientFrom: "#f5f5f5",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#f5f5f5",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [77, 95, 91, 80, 101, 85],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
  };

  const generateHourlyLabels = () => {
    const labels = [];
    const now = new Date();
    const options = { timeZone: 'Asia/Singapore', hour: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    for (let i = 24; i >= 0; i--) { // Last 24 hours
      const date = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hours = formatter.format(date);
      labels.push(`${hours}:00`);
    }

    return labels;
  };

  return (
    <>
      <Tabs.Screen options={{
        title: 'Insight',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerTitle: 'Insight',
        headerTitleAlign: 'center',
      }} />
      <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.centeredChart} onPress={() => router.push('/glucoseInsight')}>
          <View style = {styles.chartContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15}}>
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
          <View style = {styles.chartContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15}}>
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
        <View>
          <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
            <LineChart
              data={{
                labels: generateHourlyLabels(),
                datasets: [
                  {
                    data: generateHourlyLabels().map(() => Math.random() * 100)
                  }
                ]
              }}
              width={generateHourlyLabels().length * 50} // Adjust the width based on the number of labels
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </ScrollView>
        </View>
        <TouchableOpacity>
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Calorie Consumption & Blood Glucose</Text>
              <AntDesign name="right" size={16} />
            </View>
            <LineChart
              data={data}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
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
