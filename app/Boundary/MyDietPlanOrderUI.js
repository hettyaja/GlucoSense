import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { router } from 'expo-router';
import Header from '../components/Header';
import ViewUserDietPlanOrderController from '../Controller/ViewUserDietPlanOrderController';
import { useAuth } from '../service/AuthContext';
import { encode } from 'base-64';

const OngoingRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index) => (
      <TouchableOpacity
        key={`${order.orderId}-${index}`}
        style={styles.orderCard}
        onPress={() => router.push({ pathname: 'Boundary/UserDietPlanOrderDetails', params: { orderDetails: encode(JSON.stringify(order)) } })}
      >
        <Text style={styles.planName}>{order.businessPartnerName}</Text>
        <View style={styles.orderInfo}>
          <Image source={{ uri: order.dietPlanImage }} style={styles.orderImage} />
          
          <View style={{ flex: 1 }}>
            <Text style={styles.planName}>{order.dietPlanName}</Text>
            <View style={styles.row}>
              <Text style={styles.itemName}>Start: {new Date(order.startDate).toLocaleDateString()}</Text>
              <Text style={styles.itemName}>End: {new Date(order.endDate).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.notes}>Ongoing Plan</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={styles.price}>${order.totalPayment}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const EndedRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index) => (
      <TouchableOpacity
        key={`${order.orderId}-${index}`}
        style={styles.orderCard}
        onPress={() => router.push({ pathname: 'Boundary/UserDietPlanOrderDetails', params: { orderDetails: encode(JSON.stringify(order)) } })}
      >
        <Text style={styles.planName}>{order.businessPartnerName}</Text>
        <View style={styles.orderInfo}>
          <Image source={{ uri: order.dietPlanImage }} style={styles.orderImage} />
          <View style={{ flex: 1 }}>
          <Text style={styles.planName}>{order.dietPlanName}</Text>
            <View style={styles.row}>
              <Text style={styles.itemName}>Start: {new Date(order.startDate).toLocaleDateString()}</Text>
              <Text style={styles.itemName}>End: {new Date(order.endDate).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.notes}>Ended Plan</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={styles.price}>${order.totalPayment}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const MyDietPlanOrderUI = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ongoing', title: 'Ongoing' },
    { key: 'ended', title: 'Ended' },
  ]);

  const { user } = useAuth();
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [endedOrders, setEndedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await ViewUserDietPlanOrderController.viewDietPlanOrderByUserId(user.uid);
        const todayDate = new Date();

        setOngoingOrders(orders.filter(order => new Date(order.endDate) >= todayDate));
        setEndedOrders(orders.filter(order => new Date(order.endDate) < todayDate));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user.uid]);

  const renderScene = SceneMap({
    ongoing: () => <OngoingRoute orders={ongoingOrders} />,
    ended: () => <EndedRoute orders={endedOrders} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E58B68' }}
      style={{ backgroundColor: 'white' }}
      activeColor="#E58B68"
      inactiveColor="#808080"
      labelStyle={{ fontFamily: 'Poppins-Medium' }}
    />
  );

  return (
    <>
      <Header
        title='My Diet Plan Order'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  orderImage: {
    width: 88,
    height: 88,
    borderRadius: 8,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  notes: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#808080',
  },
  price: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#E58B68',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  reorderButton: {
    backgroundColor: '#E58B68',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
});

export default MyDietPlanOrderUI;
