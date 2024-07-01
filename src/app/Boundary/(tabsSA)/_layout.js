import React from 'react';
import { Tabs, Stack } from 'expo-router';

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='insightSA' options={{headerShown:false}}/>
      <Tabs.Screen name='partnerSA' options={{headerShown:false}}/>
      <Tabs.Screen name='settingSA' options={{headerShown:false}} />
      <Tabs.Screen name='userSA' options={{headerShown:false}}/>
    </Tabs>
  );
};

export default _layout;
