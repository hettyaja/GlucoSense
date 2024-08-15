import { router, Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { DietPlanCard, FoodCard } from '../components/Cards';
import Header from '../components/Header';
import ViewBusinessPartnerDietPlanOrderController from '../Controller/ViewBusinessPartnerDietPlanOrderController';
import ViewBusinessPartnerFoodOrderController from '../Controller/ViewBusinessPartnerFoodOrderController';
import { useAuth } from '../service/AuthContext';

const CompletedFoodRoute = () => {
  const { user } = useAuth();
  const [foodOrderData, setFoodOrderData] = useState([]);

  useEffect(() => {
    const loadCompletedFoodData = async () => {
      try {
        const data = await ViewBusinessPartnerFoodOrderController.viewFoodOrderByBusinessPartnerId(user.uid);
        // Filter out only completed orders
        const filteredData = data.filter(order => order.status === 'complete');
        setFoodOrderData(filteredData);
      } catch (error) {
        console.error('Error loading completed food data:', error);
      }
    };

    loadCompletedFoodData();
  }, [user.uid]);

  return (
    <ScrollView style={styles.container}>
      {foodOrderData.map((item, index) => (
        <FoodCard key={`${item.id}-${index}`} item={item} />
      ))}
    </ScrollView>
  );
};

const CompletedDietPlanRoute = () => {
  const { user } = useAuth();
  const [dietPlanOrderData, setDietPlanOrderData] = useState([]);

  useEffect(() => {
    const loadCompletedDietPlanData = async () => {
      try {
        const data = await ViewBusinessPartnerDietPlanOrderController.viewDietPlanOrderByBusinessPartnerId(user.uid);
        // Filter out diet plan orders where the end date is in the past
        const todayDate = new Date();
        const filteredData = data.filter(order => new Date(order.endDate) < todayDate);
        setDietPlanOrderData(filteredData);
      } catch (error) {
        console.error('Error loading completed diet plan data:', error);
      }
    };

    loadCompletedDietPlanData();
  }, [user.uid]);

  return (
    <ScrollView style={styles.container}>
      {dietPlanOrderData.map((item, index) => (
        <DietPlanCard key={`${item.id}-${index}`} item={item} />
      ))}
    </ScrollView>
  );
};

const ViewOrderHistoryUI = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'food', title: 'Food' },
    { key: 'dietPlan', title: 'Diet Plan' },
  ];

  const renderScene = SceneMap({
    food: CompletedFoodRoute,
    dietPlan: CompletedDietPlanRoute,
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
        title='Order History'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar} // Use custom tab bar
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
});

export default ViewOrderHistoryUI;
