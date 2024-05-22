// setting.js
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, ScrollView, Image} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { images } from '../../constants/images'

const setting = () => {
  return (
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
        <TouchableOpacity style={styles.button}>
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
        <TouchableOpacity style={styles.button}>
        <FontAwesome name="sliders" size={24} color="#000" />
          <Text style={styles.buttonText}>Change glucose unit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="sliders" size={24} color="#000" />
          <Text style={styles.buttonText}>Change unit</Text>
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
  }
})