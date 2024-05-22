import { useState } from 'react';
import {React, Image, View, Modal, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { router, Tabs } from 'expo-router'
import { useFonts } from 'expo-font'
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { images } from '../../constants/images';
import BottomSheetModal from '../../components/BottomSheetModal';
import ImageButton from '../../components/ImageButton';

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

    const handleTabPress = ({ route }) => {
      if (route.name === 'add') {
        setModalVisible(true);
        return false; // Prevents the tab from navigating
      }
      return true; // Allows the tab to navigate
    };

  return (
    <>
    <Tabs>
        <Tabs.Screen name='home' options={{
            title:'Home',
            headerShown:false,
            tabBarIcon: ({color, size}) => (
                <TabIcon icon={images.home} size={size}/>
            )
        }}/>
        <Tabs.Screen name='insight' options={{
            title:'Insight',
            headerShown:false,
            tabBarIcon: ({color, size}) => (
                <TabIcon icon={images.insight} size={size}/>
            )
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
            presentation: 'modal',
            headerShown:false,
            tabBarIcon: ({color, size}) => (
                <TabIcon icon={images.add} size={size}/>
            )
        }}/>  
        <Tabs.Screen name='food' options={{
            title:'Food',
            headerShown:false,
            tabBarIcon: ({color, size}) => (
                <TabIcon icon={images.food} size={size}/>
            )
        }}/>
      <Tabs.Screen name='setting' options={{
          title: 'Setting',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
          headerLeft: () => (
            <ImageButton
              source={require("../../assets/back.png")}
              imageSize={{width:24, height:24}}
              customStyle={{paddingLeft:10}}
              onPress={() => router.back('/registerPage')}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.button}>
              <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-Regular', fontSize:14, color:'white'}}>Upgrade</Text>
            </TouchableOpacity>
          ),
          headerTitle: 'Setting',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon={images.more} size={size} />
          )
        }} />
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