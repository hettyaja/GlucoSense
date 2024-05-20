import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedPage from './GetStartedPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import CreateRecipePage from './CreateRecipePage';
import RecipeManagementPage from './RecipeManagementPage';
import EditProfilePage from './EditProfilePage';
import SettingPage from './SettingPage';
//import NotificationScreen from './Notification';
//import ReportProblemScreen from './ReportProblem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SettingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStartedPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="CreateRecipe" component={CreateRecipePage} />
        <Stack.Screen name="RecipeManagement" component={RecipeManagementPage} />
        //import editRecipePage
        <Stack.Screen name="EditProfile" component={EditProfilePage} />
        <Stack.Screen name="SettingPage" component={SettingPage} />
        //<Stack.Screen name="Notification" component={Notification} />
        //<Stack.Screen name="ReportProblem" component={ReportProblem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
