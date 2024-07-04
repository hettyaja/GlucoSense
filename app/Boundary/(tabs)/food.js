import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from '../../../components/Header';
import MenuCard from '../../components/MenuCard';
const food= () => {

  return (
    <>
      <Header
        title='Food'
      />
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusHeaderText}>My Food</Text>
            <TouchableOpacity style={styles.statusBox}>
              <Text>3 Orders</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statusHeader}>
            <Text style={styles.statusHeaderText}>My Diet Plan</Text>
            <TouchableOpacity style={styles.statusBox}>
              <Text>3 Plans</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.recipeBox} onPress={() => router.push('recipePage')}>
          <Text>Discover our recipe</Text>
          <Ionicons name='chevron-forward' size={32} color='black' />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  statusContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    padding:16
  },
  statusHeader: {
    width:'48%',
  },
  statusHeaderText: {
    fontFamily:'Poppins-Regular',
    fontSize:14,
    paddingBottom:8
  },
  statusBox: {
    backgroundColor:'white',
    borderRadius:8,
    borderWidth:0.5,
    padding:16
  },
  recipeBox: {
    backgroundColor:'white',
    borderRadius:8,
    borderWidth:0.5,
    margin:16,
    padding:16,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }

});

export default food;
