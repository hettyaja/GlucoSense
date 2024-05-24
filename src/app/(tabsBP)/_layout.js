import { useState } from 'react';
import {React, Image, View, Modal, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { router, Stack, Tabs } from 'expo-router'
import { useFonts } from 'expo-font'
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { images } from '../../constants/images';
import BottomSheetModal from '../(tabs)/add';
import ImageButton from '../../components/ImageButton';
import { BPProfileProvider } from '../context/BPProfileContext';

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
  return (
    <>
        <Tabs>
            <Tabs.Screen name='homeBP' options={{
                title:'Home',
                headerShown:false,
                tabBarIcon: ({color, size}) => (
                    <TabIcon icon={images.home} size={size}/>
                ),
                headerLeft: () => (
                  <ImageButton
                    source={require("../../assets/back.png")}
                    imageSize={{width:24, height:24}}
                    onPress={() => router.back('/registerPage')}
                  />
                ),
            }}/>
            <Tabs.Screen name='settingBP' options={{
                title: 'Setting',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#E58B68' },
                headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
                tabBarIcon: ({color, size}) => (
                    <TabIcon icon={images.insight} size={size}/>
                ),
            }}/>
        </Tabs>
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