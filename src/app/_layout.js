import React, { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import ImageButton from '../components/ImageButton';
import { BPProfileProvider } from './context/BPProfileContext';
import { ProfileProvider } from './context/ProfileContext';
import { DietPlanProvider } from './context/DietPlanContext';
import { RecipeProvider } from './context/RecipeContext';
import { AuthProvider, useAuth } from './context/authContext';

const RootLayout = () => {
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    if (isAuthenticated) {
      if (userType === 'free') {
        router.replace('/addMeds')
      } else if (userType === 'business') {
        router.replace('homeBP')
      }
    } else if (isAuthenticated == false) {
      router.replace('/welcomePage');
    }
  }, [isAuthenticated, userType]);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     router.replace('/loginPage');
  //   } else if (isAuthenticated === true) {
  //     if (userType === 'free') {
  //       router.replace('/home');
  //     } else if (userType === 'business') {
  //       router.replace('/homeBP');
  //     }
  //   }
  // }, [isAuthenticated, userType])

  return (
    <Stack>
      {/* Define your stack screens here */}
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="(getStarted)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="welcomePage" options={{ headerShown: false }} />
      <Stack.Screen name="getStartedBP" options={{ headerShown: false }} />
      <Stack.Screen name="(question)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabsBP)" options={{ headerShown: false }} />
      <Stack.Screen name="(resetPwd)" options={{ headerShown: false }} />
      <Stack.Screen name="addMeds" />
      <Stack.Screen name="addGlucose" />
      <Stack.Screen name="EditRecipePage" />
      <Stack.Screen name="CreateRecipePage" />
      <Stack.Screen name="ViewAndSearchDietPlan" />
      <Stack.Screen name="CreateDietPlan" />
      <Stack.Screen name="searchFood" />
      <Stack.Screen name="details" options={{
        title: 'Details',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <ImageButton
            source={require("../assets/back.png")}
            imageSize={{ width: 24, height: 24 }}
            customStyle={{ paddingLeft: 10 }}
            onPress={() => router.back('/registerPage')}
          />
        ),
        headerTitle: 'Details',
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Subscribe" options={{ headerShown: false }} />
      <Stack.Screen name="profileBP" />
      <Stack.Screen name="addMeals" />
      <Stack.Screen name='ReportProblem' options={{
        title: 'ReportProblem',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <ImageButton
            source={require("../assets/back.png")}
            imageSize={{ width: 24, height: 24 }}
            customStyle={{ paddingLeft: 10 }}
            onPress={() => router.back('/registerPage')}
          />
        ),
        headerTitle: 'Help & Feedback',
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name='Notification' options={{
        title: 'Notification',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <ImageButton
            source={require("../assets/back.png")}
            imageSize={{ width: 24, height: 24 }}
            customStyle={{ paddingLeft: 10 }}
            onPress={() => router.back('/settingBP')}
          />
        ),
        headerTitle: 'Notification',
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name='profile' />
    </Stack>
  );
};

const _layout = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RecipeProvider>
        <DietPlanProvider>
          <ProfileProvider>
            <BPProfileProvider>
              <RootLayout />
            </BPProfileProvider>
          </ProfileProvider>
        </DietPlanProvider>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default _layout;
