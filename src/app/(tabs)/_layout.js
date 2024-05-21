import { useState } from 'react';
import {React, Image, View, Modal} from 'react-native'
import { Stack, Tabs } from 'expo-router'
import { useFonts } from 'expo-font'
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { images } from '../../constants/images';
import BottomSheetModal from '../../components/BottomSheetModal';

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
        <Tabs.Screen name='more' options={{
            title:'More',
            headerShown:false,
            tabBarIcon: ({color, size}) => (
                <TabIcon icon={images.more} size={size}/>
            )
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