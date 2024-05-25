// setting.js
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, ScrollView, Image} from 'react-native'
import React, { useState}from 'react'
import { router, Tabs } from 'expo-router'
import Modal from 'react-native-modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { images } from '../../constants/images'

const setting = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [glucoseUnit, setGlucoseUnit] = useState('mmoL/L')
  const [weightUnit, setWeightUnit] = useState('kgs')
  const [modalType, setModalType] = useState('')

  const handleGlucoseUnit = (glucoseSelection) => {
    setGlucoseUnit(glucoseSelection)
    toggleModal()
  }

  const handleWeightUnit = (weightSelection) => {
    setWeightUnit(weightSelection)
    toggleModal()
  }

  const toggleModal = () => {
    setModalVisible(false)
  }

  const openModal = (type) => {
    setModalType(type)
    setModalVisible(true)
  }

  return (
    <>
    <Tabs.Screen options={{
        title: 'Edit profile',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerRight: () => (
          <TouchableOpacity>
            <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-SemiBold', fontSize:14, color:'white'}}>Upgrade</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Edit profile',
        headerTitleAlign: 'center',
      }}/>

    <ScrollView style={styles.safeArea}>
      <View style={[styles.profileCard, Platform.OS === 'ios' && styles.shadow]}>
        <TouchableOpacity style={{flexDirection:'row', padding:32, alignItems:'center'}}
           onPress={() => router.push({ pathname: 'profile', params: { name: 'Agustianto Jusuf Kalla' } })}>
            <View style={styles.profileImage}/>
            <View>
              <Text style={{fontFamily:'Poppins-Bold', fontSize:16}}>
                Agustianto Jusuf Kalla
              </Text>
              <Text style={{fontFamily:'Poppins-Regular', fontSize:14}}>
                Free User
              </Text>
            </View>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('test')}>
          <Fontisto name="blood-test" size={24} color="#000" />
          <Text style={styles.buttonText}>Connect blood glucose meter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="bar-chart" size={32} color="#000" />
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={images.reminder} style={styles.iconImage}/>
          <Text style={styles.buttonText}>Reminder</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => openModal('glucoseUnit')}>
          <FontAwesome name="sliders" size={24} color="#000" />
          <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', paddingRight:16}}>
          <Text style={styles.buttonText}>Change glucose unit</Text>
          <Text style={{color:'#808080', fontFamily:'Poppins-Medium', fontSize:16}}>{glucoseUnit}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('weightUnit')}>
          <FontAwesome name="sliders" size={24} color="#000" />
          <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', paddingRight:16}}>
          <Text style={styles.buttonText}>Change weight unit</Text>
          <Text style={{color:'#808080', fontFamily:'Poppins-Medium', fontSize:16}}>{weightUnit}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('ReportProblem')}>
          <FontAwesome name="question-circle" size={24} color="#000" />
          <Text style={styles.buttonText}>Help & Feedback</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome
           name="user-times" size={24} color="#000" />
          <Text style={styles.buttonText}>Delete account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="sign-out" size={24} color="#000" />
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <Modal
      isVisible={isModalVisible}
      swipeDirection={'down'}
      onBackdropPress={toggleModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        {modalType === 'glucoseUnit' ? (
          <>

          <TouchableOpacity style={[styles.selectButton, {borderTopLeftRadius:16, borderTopRightRadius:16, borderBottomWidth:0.5, borderBottomColor:'#808080'}]} onPress={() => handleGlucoseUnit('mmoL/L')}>
          <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>mmol/L</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.selectButton, {borderBottomLeftRadius:16, borderBottomRightRadius:16}]} onPress={() => handleGlucoseUnit('mg/dL')}>
          <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>mg/dL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
          <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>Cancel</Text>
        </TouchableOpacity>

        </>
        ) : ( 
          <>
        <TouchableOpacity style={[styles.selectButton, {borderTopLeftRadius:16, borderTopRightRadius:16, borderBottomWidth:0.5, borderBottomColor:'#808080'}]} onPress={() => handleWeightUnit('kgs')}>
          <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>kgs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.selectButton, {borderBottomLeftRadius:16, borderBottomRightRadius:16}]} onPress={() => handleWeightUnit('lbs')}>
          <Text style={{fontFamily:'Poppins-Regular', fontSize:16}}>lbs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
          <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>Cancel</Text>
        </TouchableOpacity>
          </>

        )} 

      </View>
    </Modal>
    </>
  )
}

export default setting

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor:'#f5f5f5'
  },
  profileCard: {
    backgroundColor:'white',
    flexDirection:'row',
    margin:24,
    borderRadius:8,
    elevation:5
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    borderWidth:1,
    borderRadius:100,
    borderColor:'black',
    width:56,
    height:56,
    marginRight:16
  },
  section: {
    backgroundColor:'white',
    marginVertical:16,
  },
  button: {
    padding:12,
    borderBottomWidth:1,
    borderBottomColor:'#d9d9d9',
    flexDirection:'row',
    alignItems:'center'
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize:16,
    marginLeft:16
  },
  iconImage: {
    width:32,
    height:32
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
})