import React from 'react';
import { Tabs, Stack } from 'expo-router';
import PartnerSA from './(tabsSA)/partnerSA';
import PendingAccountList from './(tabsSA)/pendingAccountList';
import PendingAccountDetails from './(tabsSA)/pendingAccountDetails';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}>
        {() => (
          <Tabs>
            <Tabs.Screen name="insightSA" options={{ headerShown: false }} />
            <Tabs.Screen name="partnerSA" options={{ headerShown: false }} />
            <Tabs.Screen name="settingSA" options={{ headerShown: false }} />
            <Tabs.Screen name="userSA" options={{ headerShown: false }} />
          </Tabs>
        )}
      </Stack.Screen>
      <Stack.Screen name="pendingAccountList" component={PendingAccountList} options={{ headerShown: false }} />
      <Stack.Screen name="pendingAccountDetails" component={PendingAccountDetails} options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
