import { View, Text, Dimensions, ScrollView, TouchableOpacity, FlatList, StyleSheet, Button} from 'react-native'
import React, { useState } from 'react'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { router, Tabs } from 'expo-router';
import { useProfile } from '../context/ProfileContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal'

const home = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [isDateModalVisible, setDateModalVisible] = useState(false)
  const [filterType, setFilterType] = useState('Display all')
  const [dateType, setDateType] = useState('Today')

  const toggleModal = () => {
    setModalVisible(false)
  }

  const handleFilterType = (filterSelected) => {
    setFilterType(filterSelected)
    toggleModal()
  }

  const toggleDateModal = () => {
    setDateModalVisible(false)
  }

  const handleDateType = (dateSelected) => {
    setDateType(dateSelected)
    toggleDateModal()
  }


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
          <TouchableOpacity style={{marginRight:16}} onPress={() => router.push('reminder')}>
            <MaterialCommunityIcons name='bell-outline' size={24} color='white'/>
          </TouchableOpacity>
        ),
      }}/>
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{fontFamily:'Poppins-Bold', fontSize:18, color:'white'}}>Blood Glucose</Text>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => setDateModalVisible(true)}>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14, color:'white'}}>{dateType} </Text>
              <AntDesign name='caretdown' size={8} color='white'/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', padding:16, justifyContent:'space-evenly'}}>
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
          </View>
          <View style={{flexDirection:'row-reverse'}}>
          <TouchableOpacity style={{borderColor:'white', borderWidth:1, borderRadius:8, width:'20%', paddingHorizontal:8}} onPress={() => router.push('Subscribe')}>
            <Text style={styles.titleText}>A1C: ~</Text>
          </TouchableOpacity>
          </View>

        </View>
        <ScrollView style={{backgroundColor:'#f5f5f5', flex:1, borderTopLeftRadius:16, borderTopRightRadius:16}}>
          <View style={{padding:16, alignItems:'flex-end'}}>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => setModalVisible(true)}>
              <Text style={{fontFamily:'Poppins-Medium'}}>{filterType} </Text>
              <AntDesign name='caretdown' size={8} color='black'/>
            </TouchableOpacity>
          </View>
          <Text style={{fontFamily:'Poppins-SemiBold', fontSize:14, paddingHorizontal:16, paddingBottom:16, color:'#808080'}}>Today</Text>
          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('editGlucose')}>
              <Fontisto name='blood-drop' size={24} color='black' style={{paddingRight:16}}/>
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingRight:8}}>
                <View>
                  <Text style={styles.buttonText}>5.7 mmol/L</Text>
                  <Text style={styles.buttonText2}>1:33 PM</Text>
                </View>
                <Ionicons name='chevron-forward' size={24} color='#808080'/>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomColor:'#d9d9d9', borderBottomWidth:1}}/>
            <TouchableOpacity style={styles.button} onPress={() => router.push('editMeds')}>
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

      <Modal
      isVisible={isModalVisible}
      swipeDirection={'down'}
      onBackdropPress={toggleModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
            <TouchableOpacity style={[styles.selectButton, {borderTopLeftRadius:16, borderTopRightRadius:16, borderBottomWidth:0.5, borderBottomColor:'#808080'}]} onPress={() => handleFilterType('Display all')}>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>Display all</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectButton, {borderBottomWidth:0.5, borderBottomColor:'#808080'}]} onPress={() => handleFilterType('Glucose')}>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>Glucose</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectButton, {borderBottomWidth:0.5, borderBottomColor:'#808080'}]} onPress={() => handleFilterType('Meal')}>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectButton, {borderBottomLeftRadius:16, borderBottomRightRadius:16}]} onPress={() => handleFilterType('Medicine')}>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
              <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>Cancel</Text>
            </TouchableOpacity>
      </View>
      </Modal>
      
      <Modal
      isVisible={isDateModalVisible}
      swipeDirection={'down'}
      onBackdropPress={toggleDateModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
            <TouchableOpacity style={[styles.selectButton, {borderTopLeftRadius:16, borderTopRightRadius:16, borderBottomWidth:0.5, borderBottomColor:'#f5f5f5'}]} onPress={() => handleDateType('Today')}>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectButton, {borderBottomWidth:0.5, borderBottomColor:'#808080'}]} onPress={() => handleDateType('7 Day')}>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>7 Day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectButton, {borderBottomLeftRadius:16, borderBottomRightRadius:16}]} onPress={() => handleDateType('30 Day')}>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>30 Day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
              <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>Cancel</Text>
            </TouchableOpacity>
      </View>
      </Modal>
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
    height:170
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
  },
  modal: {
    margin:0,
    justifyContent:'flex-end'
  },
  modalContent: {
    alignItems:'center',
    margin:8
  },
  cancelButton: {
    backgroundColor:'#f5f5f5',
    marginTop:8,
    marginBottom:16,
    padding:16,
    width:'98%',
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center'
  },
  selectButton: {
    backgroundColor:'#f5f5f5',
    padding:16,
    width:'98%',
    justifyContent:'center',
    alignItems:'center'
  }

});