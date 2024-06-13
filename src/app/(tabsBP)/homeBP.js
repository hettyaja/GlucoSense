import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { LineChart, BarChart } from 'react-native-chart-kit';
import BottomSheetModal from '../(tabs)/add';

const homeBP = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [30, 80, 45, 60, 100, 70],
      },
    ],
  };

  return (
    <>

    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>

      </View>
      <View style={styles.cardContainer}>

</View>
<View style={styles.cardContainer}>

</View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Users</Text>
          <Text style={styles.cardValue}>1,234</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Revenue</Text>
          <Text style={styles.cardValue}>$12,345</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Active Users</Text>
          <Text style={styles.cardValue}>567</Text>
        </View>
      </View>

      <Text style={styles.chartTitle}>Line Chart</Text>
      <LineChart
        data={lineChartData}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={chartConfig}
      />

      <Text style={styles.chartTitle}>Bar Chart</Text>
      <BarChart
        data={barChartData}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={chartConfig}
      />
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '30%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 18,
    color: 'green',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  openModalText: {
    fontSize: 18,
    color: 'white',
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default homeBP;
