import React, { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import ImageButton from './components/ImageButton';
import { AuthProvider, useAuth } from './service/AuthContext';
import { MenuProvider } from 'react-native-popup-menu';
import * as Notifications from 'expo-notifications';
import { PaymentAndAddressProvider } from './context/PaymentAndAddressContext';


const RootLayout = () => {
  const { user, userType } = useAuth();

  useEffect(() => {
    // Request permissions for notifications
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      // Handle foreground notifications (optional)
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    };

    requestPermissions();

    if (user) {
      if (userType === 'user' && !user.bodyProfileComplete) {
        router.replace('Boundary/question1')
      } else if (userType === 'user') {
        router.replace('Boundary/home')
      } else if (userType === 'businessPartner') {
        router.replace('Boundary/OrderBP')
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
      <Stack.Screen name="Boundary/Subscribe" options={{ headerShown: false }} />
      <Stack.Screen name="Boundary/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Boundary/(tabsBP)" options={{ headerShown: false }} />
      <Stack.Screen name="Boundary/(tabsSA)" options={{ headerShown: false }} />
      <Stack.Screen name="Boundary/MenuDetailsUI" options={{
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
      <Stack.Screen name="Boundary/ViewProfileBpUI" />
      <Stack.Screen name='Boundary/SelectMedicineUI' />
      <Stack.Screen name='Boundary/CreateMedListUI' />
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
    <PaymentAndAddressProvider>
      <MenuProvider>
        <AuthProvider>
                  <RootLayout />
        </AuthProvider>
      </MenuProvider>
    </PaymentAndAddressProvider>
  );
};

export default _layout;
