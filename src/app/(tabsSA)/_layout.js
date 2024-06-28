// _layout.js
import PartnerSA from './partnerSA';
import PendingAccountList from './pendingAccountList';
import PendingAccountDetails from './pendingAccountDetails';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Stack } from 'expo-router';

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="insightSA" options={{ headerShown: false }} />
      <Tabs.Screen name="partnerSA" options={{ headerShown: false }}>
        {() => (
          <Stack>
            <Stack.Screen name="index" component={PartnerSA} options={{ headerShown: false }} />
            <Stack.Screen name="pendingAccountList" component={PendingAccountList} options={{ headerShown: false }} />
            <Stack.Screen name="pendingAccountDetails" component={PendingAccountDetails} options={{ headerShown: false }} />
          </Stack>
        )}
      </Tabs.Screen>
      <Tabs.Screen name="settingSA" options={{ headerShown: false }} />
      <Tabs.Screen name="userSA" options={{ headerShown: false }} />
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default _layout;
