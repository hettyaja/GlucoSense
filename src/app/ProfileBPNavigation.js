// // ProfileBPNavigation.js

// import 'react-native-gesture-handler';
// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import ViewProfile from './ViewProfile';
// import EditProfile from './EditProfile';

// const Stack = createStackNavigator();

// const ProfileBPNavigation = () => {
//   const [profileData, setProfileData] = useState({
//     photoUri: '',
//     shopName: '',
//     username: '',
//     location: '',
//     description: ''
//   });

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="ViewProfile">
//         <Stack.Screen name="ViewProfile">
//           {(props) => <ViewProfile {...props} profileData={profileData} />}
//         </Stack.Screen>
//         <Stack.Screen name="EditProfile">
//           {(props) => <EditProfile {...props} profileData={profileData} setProfileData={setProfileData} />}
//         </Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default ProfileBPNavigation;
