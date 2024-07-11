import React from 'react';
import { DietPlanProvider } from './DietPlanContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateDietPlan from './CreateDietPlan';
import ViewAndSearchDietPlan from './ViewAndSearchDietPlan';
import Subscribe from './Boundary/Subscribe';
import { MenuProvider } from 'react-native-popup-menu';

const Stack = createStackNavigator();

const App = () => {
  return (
    <DietPlanProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ViewAndSearchDietPlan">
            <Stack.Screen name="ViewAndSearchDietPlan" component={ViewAndSearchDietPlan} />
            <Stack.Screen name="CreateDietPlan" component={CreateDietPlan} />
            <Stack.Screen name="Subscribe" component={Subscribe} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </DietPlanProvider>
  );
};

export default App;
