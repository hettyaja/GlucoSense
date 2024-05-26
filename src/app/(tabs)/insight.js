import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import Entypo from 'react-native-vector-icons/Entypo'

const insight = () => {
  const screenWidth = Dimensions.get("window").width;

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

  return (
    <>
    <Tabs.Screen options={{
        title: 'Insight',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerTitle: 'Insight',
        headerTitleAlign: 'center',
      }}/>
    <ScrollView style={styles.container}>
      <TouchableOpacity>
        <View style={styles.section}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>Calorie Consumption</Text>
            <Entypo name="resize-full-screen" size={16}/>
          </View>
            <LineChart
              data={data}
              width={screenWidth-32}
              height={220}
              chartConfig={chartConfig}
            />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.section}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>Blood Glucose</Text>
            <Entypo name="resize-full-screen" size={16}/>
          </View>
          <LineChart
            data={data}
            width={screenWidth-32}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.section}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>Calorie Consumption & Blood Glucose</Text>
            <Entypo name="resize-full-screen" size={16}/>
          </View>
          <LineChart
            data={data}
            width={screenWidth-32}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
    </>

  )
}

export default insight

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5f5f5'
  },
  section: {
    backgroundColor:'white',
    padding:16,
    marginTop:16
  }
})