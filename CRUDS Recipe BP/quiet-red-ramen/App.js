// App.js or Navigation.js (where you set up your navigation stack)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuRecipeManagementPage from './MenuRecipeManagementPage';
import DraftPage from './DraftPage';
import CreateRecipePage from './CreateRecipePage';
import EditRecipePage from './EditRecipePage';
import { RecipeProvider } from './RecipeContext';  // Import RecipeProvider

const Stack = createStackNavigator();

const App = () => {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateRecipePage">
          <Stack.Screen name="MenuRecipeManagementPage" component={MenuRecipeManagementPage} />
          <Stack.Screen name="DraftPage" component={DraftPage} />
          <Stack.Screen name="CreateRecipePage" component={CreateRecipePage} />
          <Stack.Screen name="EditRecipePage" component={EditRecipePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
};

export default App;
