import { View, Text, Dimensions, ScrollView, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { Tabs } from 'expo-router';
import { useProfile } from '../context/ProfileContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const home = () => {
  const { profileData } = useProfile()

  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

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
      <View style={{flex:1, backgroundColor:'#E58B68'}}>
        <ScrollView style={{backgroundColor:'#f5f5f5', flex:1, borderTopLeftRadius:16, borderTopRightRadius:16, padding:16}}>
          <ScrollView horizontal={true}>
            <ProgressChart
              data={data}
              width={Dimensions.get('window').width - 16}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
              style={{borderRadius:16, marginRight:16}}
            />

            <ProgressChart
            data={data}
            width={Dimensions.get('window').width - 32}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={{borderRadius:16}}
          />
          </ScrollView>
          <Text style={{marginVertical:16, fontFamily:'Poppins-SemiBold', fontSize:16}}>Quick Action</Text>
          <ScrollView horizontal={true}>
            <View style={{paddingRight:16}}>
              <View style={{height:56, width:56, borderRadius:50, backgroundColor:'#d5d5d5'}}></View>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14}}>Shortcut</Text>
            </View>
            <View style={{paddingRight:16}}>
              <View style={{height:56, width:56, borderRadius:50, backgroundColor:'#d5d5d5'}}></View>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14}}>Shortcut</Text>
            </View>
            <View style={{paddingRight:16}}>
              <View style={{height:56, width:56, borderRadius:50, backgroundColor:'#d5d5d5'}}></View>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14}}>Shortcut</Text>
            </View>
            <View style={{paddingRight:16}}>
              <View style={{height:56, width:56, borderRadius:50, backgroundColor:'#d5d5d5'}}></View>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14}}>Shortcut</Text>
            </View>
            <View style={{paddingRight:16}}>
              <View style={{height:56, width:56, borderRadius:50, backgroundColor:'#d5d5d5'}}></View>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14}}>Shortcut</Text>
            </View>
            <View style={{paddingRight:16}}>
              <View style={{height:56, width:56, borderRadius:50, backgroundColor:'#d5d5d5'}}></View>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14}}>Shortcut</Text>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </>
  )
}

export default home