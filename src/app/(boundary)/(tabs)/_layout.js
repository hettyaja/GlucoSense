import { useState } from 'react';
import {React, Image, View, Modal, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { router, Tabs } from 'expo-router'
import { useFonts } from 'expo-font'
import { Octicons } from '@expo/vector-icons';
import { images } from '../../../constants/images';
import BottomSheetModal from './add';
import ImageButton from '../../../components/ImageButton';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

const TabIcon = ({ icon, size, color}) => {
    return (
        <View>
            <Image
            source={icon}
            style={{width:size, height:size}}
            />
        </View>
    );
  };

const _layout = () => {
    const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs>
        <Tabs.Screen name='home' options={{
            headerShown:false,
            title:'Home',
            tabBarIcon: () => (
                <Octicons name='home' size={24} color='#E58B68'/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                  Home
              </Text>
          ),
        }}/>
        <Tabs.Screen name='insight' options={{
            title:'Insight',
            tabBarIcon: () => (
                <SimpleLineIcons name='graph' size={24} color='#E58B68'/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                  Insight
              </Text>
          ),
        }}/>
        <Tabs.Screen name='add' 
        listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
        options={{
            title:'',
            presentation:'modal',
            headerShown:false,
            tabBarIcon: ({color, size}) => (
                <TabIcon icon={images.add} size={size}/>
            )
        }}/>  
        <Tabs.Screen name='food' options={{
            title:'Food',
            tabBarIcon: () => (
                <FontAwesome name='cutlery' size={24} color='#E58B68'/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                  Food
              </Text>
          ),
        }}/>
        <Tabs.Screen name='setting' options={{
            title:'Setting',
            tabBarIcon: () => (
                <AntDesign name='setting' size={24} color='#E58B68'/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', color: '#E58B68' }}>
                  Setting
              </Text>
          ),
        }}/>
    </Tabs>
    <BottomSheetModal
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)}
    />
</>
  );
};

export default _layout

const styles = StyleSheet.create({
  button: {
    borderWidth:1,
    borderColor:'white',
    borderRadius:8,
    marginHorizontal:16
  }
})