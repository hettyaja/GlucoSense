import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs, Stack } from 'expo-router';
import PartnerSA from './partnerSA';
import PendingAccountList from './pendingAccountList';
import PendingAccountDetails from './pendingAccountDetails';

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="insightSA" options={{ headerShown: false }} />
      <Tabs.Screen name="partnerSA" options={{ headerShown: false }}>
        {() => (
          <Stack>
            <Stack.Screen name="partnerSA" component={PartnerSA} options={{ headerShown: false }} />
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

export default _layout;

const styles = StyleSheet.create({});
