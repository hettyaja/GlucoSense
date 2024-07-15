import React from 'react';
import { Tabs, Stack } from 'expo-router';
import PartnerSA from './partnerSA';
import PendingAccountList from '../pendingAccountList';
import PendingAccountDetails from '../pendingAccountDetails';
import InsightSA from '../insightSA';
import SettingSA from '../settingSA';
import UserSA from '../userSA';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}>
        {() => (
          <Tabs>
            <Tabs.Screen name="insightSA" component={InsightSA} options={{ headerShown: false }} />
            <Tabs.Screen name="partnerSA" component={PartnerSA} options={{ headerShown: false }} />
            <Tabs.Screen name="settingSA" component={SettingSA} options={{ headerShown: false }} />
            <Tabs.Screen name="userSA" component={UserSA} options={{ headerShown: false }} />
          </Tabs>
        )}
      </Stack.Screen>
      <Stack.Screen name="pendingAccountList" component={PendingAccountList} options={{ headerShown: false }} />
      <Stack.Screen name="pendingAccountDetails" component={PendingAccountDetails} options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
