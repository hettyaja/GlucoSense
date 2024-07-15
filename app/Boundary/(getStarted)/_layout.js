import React from 'react';
import { Stack } from 'expo-router';

const GetStartedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="getStartedPage_1"/>
      <Stack.Screen name="getStartedPage_2"/>
      <Stack.Screen name="getStartedPage_3"/>
    </Stack>
  );
};

export default GetStartedLayout;