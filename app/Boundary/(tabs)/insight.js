import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import Entypo from 'react-native-vector-icons/Entypo';
import { retrieveGlucoseLogs } from '../../Controller/RetrieveGlucoseLogsController';

const insight = () => {
  const screenWidth = Dimensions.get("window").width;

  const prepareDataForGraph = async (userId) => {
    const glucoseData = await retrieveGlucoseLogs(userId);
    glucoseData.sort((a, b) => a.time - b.time); // Sort data by time
  
    const labels = glucoseData.map(item => {
      const hours = item.time.getHours().toString().padStart(2, '0');
      const minutes = item.time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });
  
    const data = glucoseData.map(item => item.glucoseValue);
  
    return { labels, datasets: [{ data }] };
  };
  
  const userId = "kGS6OVl4XKT2fBZS4Cs3PMOjuO22";
  const graphData = prepareDataForGraph(userId);

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

  const generateHourlyLabels1 = () => {
    const labels = [];
    const now = new Date();
    const options = { timeZone: 'Asia/Singapore', hour: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);
  
    for (let i = 5; i >= 0; i--) {
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
        <TouchableOpacity style={styles.centeredChart}>
          <View style = {styles.chartContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15}}>
              <Text style={styles.chartTitle}>Blood Glucose</Text>
              <Entypo name="resize-full-screen" size={16} />
            </View>
              <LineChart
                data={{
                  labels: generateHourlyLabels1(),
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }}
                width={Dimensions.get('window').width}
                height={220}
                //yAxisLabel="$"
                //yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
        <TouchableOpacity>
        <LineChart
          data={graphData}
          width={Dimensions.get('window').width - 16}
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
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centeredChart}>
          <View style = {styles.chartContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15}}>
              <Text style={styles.chartTitle}>Calorie Consumption</Text>
              <Entypo name="resize-full-screen" size={16} />
            </View>
              <LineChart
                data={{
                  labels: generateHourlyLabels1(),
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }}
                width={Dimensions.get('window').width}
                height={220}
                //yAxisLabel="$"
                //yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
        <TouchableOpacity style={styles.centeredChart}>
          <View style = {styles.chartContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 15}}>
              <Text style={styles.chartTitle}>Calorie Consumption & Blood Glucose</Text>
              <Entypo name="resize-full-screen" size={16} />
            </View>
              <LineChart
                data={{
                  labels: generateHourlyLabels1(),
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }}
                width={Dimensions.get('window').width}
                height={220}
                //yAxisLabel="$"
                //yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Calorie Consumption</Text>
              <Entypo name="resize-full-screen" size={16} />
            </View>
            <LineChart
              data={data}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Blood Glucose</Text>
              <Entypo name="resize-full-screen" size={16} />
            </View>
            <LineChart
              data={data}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Calorie Consumption & Blood Glucose</Text>
              <Entypo name="resize-full-screen" size={16} />
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

export default insight;

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
