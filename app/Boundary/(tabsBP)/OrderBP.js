import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { DietPlanCard, FoodCard } from '../../components/Cards';
import Header from '../../components/Header';
import ViewDietPlanOrderController from '../../Controller/ViewDietPlanOrderController';
import ViewBusinessPartnerFoodOrderController from '../../Controller/ViewBusinessPartnerFoodOrderController';
import { useAuth } from '../../service/AuthContext';

const FirstRoute = () => {
  const { user } = useAuth()
  const [foodOrderData, setFoodOrderData] = useState([]);

  useEffect(() => {
    const loadFoodData = async () => {
      try {
        const data = await ViewBusinessPartnerFoodOrderController.viewFoodOrderByBusinessPartnerId(user.uid);
        setFoodOrderData(data);
      } catch (error) {
        console.error('Error loading food data:', error);
      }
    };

    loadFoodData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {foodOrderData.map(item => (
        <FoodCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const SecondRoute = () => {
  const { user } = useAuth()
  const [dietPlanOrderData, setDietPlanOrderData] = useState([]);

  useEffect(() => {
    const loadDietPlanData = async () => {
      try {
        const data = await ViewDietPlanOrderController.viewDietPlanOrderByBusinessPartnerId(user.uid);
        setDietPlanOrderData(data);
      } catch (error) {
        console.error('Error loading diet plan data:', error);
      }
    };

    loadDietPlanData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {dietPlanOrderData.map(item => (
        <DietPlanCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const OrderBP = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Food' },
    { key: 'second', title: 'Diet Plan' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E58B68' }} // Change the indicator color
      style={{ backgroundColor: 'white' }} // Change the tab bar background color
      activeColor="#E58B68" // Change the active tab text color
      inactiveColor="#808080" // Change the inactive tab text color
      labelStyle={{ fontFamily: 'Poppins-Medium' }} // Customize the tab label font
    />
  );

  return (
    <>
      <Header title="Order" />
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

export default OrderBP;
