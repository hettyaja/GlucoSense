import { View, Text, Dimensions, ScrollView, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import React from 'react'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { Tabs } from 'expo-router';
import { useProfile } from '../context/ProfileContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const home = () => {


  return (
    <>
    <Tabs.Screen options={{
        title: '',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerTitle: '',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <View style={{flexDirection:'row', marginLeft:16}}>
            <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white'}}>Welcome, </Text>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16, color:'white'}}>Agustianto</Text>
          </View>

        ),
        headerRight: () => (
          <TouchableOpacity style={{marginRight:16}}>
            <MaterialCommunityIcons name='bell-outline' size={24} color='white'/>
          </TouchableOpacity>
        ),
      }}/>
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{fontFamily:'Poppins-Bold', fontSize:18, color:'white'}}>Blood Glucose</Text>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14, color:'white'}}>Today </Text>
              <AntDesign name='caretdown' size={8} color='white'/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', padding:16, margin:16, justifyContent:'space-evenly'}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.titleText}>Avg</Text>
              <Text style={styles.subTitleText}>---</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.titleText}>Low</Text>
              <Text style={styles.subTitleText}>---</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.titleText}>High</Text>
              <Text style={styles.subTitleText}>---</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.titleText}>A1C</Text>
              <Text style={styles.subTitleText}>~</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{backgroundColor:'#f5f5f5', flex:1, borderTopLeftRadius:16, borderTopRightRadius:16}}>
          <View style={{padding:16, alignItems:'flex-end'}}>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{fontFamily:'Poppins-Medium'}}>Display all </Text>
              <AntDesign name='caretdown' size={8} color='black'/>
            </TouchableOpacity>
          </View>
          <Text style={{fontFamily:'Poppins-SemiBold', fontSize:14, paddingHorizontal:16, paddingBottom:16, color:'#808080'}}>Today</Text>
          <View style={styles.section}>
            <TouchableOpacity style={styles.button}>
              <Fontisto name='blood-drop' size={24} color='black' style={{paddingRight:16}}/>
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingRight:8}}>
                <View>
                  <Text style={styles.buttonText}>120 mg/dL</Text>
                  <Text style={styles.buttonText2}>1:33 PM</Text>
                </View>
                <Ionicons name='chevron-forward' size={24} color='#808080'/>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
            <TouchableOpacity style={styles.button}>
              <Fontisto name='pills' size={24} color='black' style={{paddingRight:8}}/>
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingRight:8}}>
                <View>
                  <Text style={styles.buttonText}>2 Pills</Text>
                  <Text style={styles.buttonText2}>1:53 PM</Text>
                </View>
                <Ionicons name='chevron-forward' size={24} color='#808080'/>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons name='food' size={24} color='black' style={{paddingRight:8}}/>
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingRight:8}}>
                <View>
                  <Text style={styles.buttonText}>500 Carbs</Text>
                  <Text style={styles.buttonText2}>1:59 PM</Text>
                </View>
                <Ionicons name='chevron-forward' size={24} color='#808080'/>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#E58B68'
  },
  headerArea: {
    backgroundColor:'E58B68',
    padding:16,
    height:160
  },
  titleText: {
    fontFamily:'Poppins-Medium',
    fontSize:18,
    color:'white'
  },
  subTitleText: {
    fontFamily:'Poppins-Bold',
    fontSize:20,
    color:'white'
  },
  scrollArea: {

  },
  section: {
    backgroundColor:'white',
    marginBottom:24,
    paddingHorizontal:16
  },
  button: {
    paddingHorizontal:16,
    paddingVertical:8,
    flexDirection:'row',
    alignItems:'center'
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize:16,
    marginLeft:16
  },
  buttonText2: {
    fontFamily: 'Poppins-Regular',
    fontSize:14,
    marginLeft:16,
    color:'#808080'
  }

});