import React, { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import ImageButton from './components/ImageButton';
import { BPProfileProvider } from './context/BPProfileContext';
import { ProfileProvider } from './context/ProfileContext';
import { DietPlanProvider } from './context/DietPlanContext';
import { AuthProvider, useAuth } from './service/AuthContext';
import { MenuProvider } from 'react-native-popup-menu';


const RootLayout = () => {
  const { user, userType } = useAuth();

  useEffect(() => {
    if (user) {
      if (userType === 'user' && !user.bodyProfileComplete) {
        router.replace('Boundary/question1')
      } else if (userType === 'user') {
        router.replace('Boundary/food')
      } else if (userType === 'businessPartner') {
        router.replace('Boundary/homeBP')
      } else if (userType === 'systemAdmin') {
        router.replace('Boundary/insightSA')
      }
    } else if (user == false) {
      router.replace('Boundary/getStartedPage_1');
    }
  }, [user, userType]);

  return (
    <Stack>
      {/* Define your stack screens here */}
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="Boundary/(getStarted)" options={{ headerShown: false}}/>
      <Stack.Screen name="Boundary/welcomePage" options={{ headerShown: false }} />
      <Stack.Screen name="Boundary/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Boundary/(tabsBP)" options={{ headerShown: false }} />
      <Stack.Screen name="Boundary/(tabsSA)" options={{ headerShown: false }} />
      <Stack.Screen name="addMeds" />
      <Stack.Screen name="Boundary/addGlucose" />
      <Stack.Screen name="ViewAndSearchDietPlan" />
      <Stack.Screen name="searchFood" />
      <Stack.Screen name="details" options={{
        title: 'Details',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <ImageButton
            source={require("./assets/back.png")}
            imageSize={{ width: 24, height: 24 }}
            customStyle={{ paddingLeft: 10 }}
            onPress={() => router.back('/registerPage')}
          />
        ),
        headerTitle: 'Details',
        headerTitleAlign: 'center',
      }} />
      {/* <Stack.Screen name="Subscribe" options={{ headerShown: false }} /> */}
      <Stack.Screen name="Boundary/ProfileBpPage" />
      <Stack.Screen name="addMeals" />
      <Stack.Screen name="selectMedicine" />
      <Stack.Screen name='ReportProblem' options={{
        title: 'ReportProblem',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <ImageButton
            source={require("./assets/back.png")}
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
            source={require("./assets/back.png")}
            imageSize={{ width: 24, height: 24 }}
            customStyle={{ paddingLeft: 10 }}
            onPress={() => router.back('/settingBP')}
          />
        ),
        headerTitle: 'Notification',
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name='profile' />
      <Stack.Screen name='createMedicine' />
    </Stack>
  );
};

const _layout = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <MenuProvider>
      <AuthProvider>
          <DietPlanProvider>
            <ProfileProvider>
              <BPProfileProvider>
                <RootLayout />
              </BPProfileProvider>
            </ProfileProvider>
          </DietPlanProvider>
      </AuthProvider>
    </MenuProvider>
  );
};

export default _layout;
