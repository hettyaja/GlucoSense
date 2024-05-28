import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs, router} from 'expo-router'

const food= () => {
  const items = [
    { name: 'Chicken Rice', price: 30,image: 'https://reactnative.dev/img/tiny_logo.png'},
    { name: 'Beef Noodles', price: 25, image: 'https://example.com/image2.jpg' },
    { name: 'Vegetable Salad', price: 20, image: 'https://example.com/image3.jpg' },
  ];

  const HorizontalScrollSection = ({ title, items }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {items.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.image}} style={styles.image} />
              <Text style={styles.itemName}>{item.name}</Text>
              {item.price && <Text style={styles.itemPrice}>${item.price}</Text>}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <>
    <Tabs.Screen options={{
        title: 'Food',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerTitle: 'Food',
        headerTitleAlign: 'center',
      }}/>
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => router.push('dumpMeal')}>
          <HorizontalScrollSection title="History" items={items} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('order')}>
        <HorizontalScrollSection title="Available food" items={items} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('Subscribe')}>
        <HorizontalScrollSection title="Diet plan" items={items} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
 
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  card: {
    width: 150,
    height:220,
    paddingBottom: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 1,
  },
  itemName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 14,
    paddingLeft: 8,
    color: '#888',
  },
  
});

export default food;
