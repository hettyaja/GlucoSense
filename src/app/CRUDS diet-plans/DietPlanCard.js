// import React, { useState, useContext } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
// import { DietPlanContext } from './DietPlanContext';
// import { AntDesign } from '@expo/vector-icons';

// const DietPlanCard = ({ dietPlan }) => {
//   const { removeDietPlan } = useContext(DietPlanContext);

//   const handleDelete = () => {
//     removeDietPlan(dietPlan.id);
//   };

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.day}>{dietPlan.day}</Text>
//         <Menu>
//           <MenuTrigger>
//             <AntDesign name="ellipsis1" size={30} color="black" />
//           </MenuTrigger>
//           <MenuOptions>
//             <MenuOption onSelect={handleDelete} text="Delete this diet plan" />
//           </MenuOptions>
//         </Menu>
//       </View>
//       <View style={styles.mealContainer}>
//         <Text style={styles.mealType}>Lunch</Text>
//         <View style={styles.mealContent}>
//           {dietPlan.meals.lunch.image && (
//             <Image source={{ uri: dietPlan.meals.lunch.image }} style={styles.image} />
//           )}
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>{dietPlan.meals.lunch.title}</Text>
//             <Text style={styles.description}>{dietPlan.meals.lunch.description}</Text>
//             <Text style={styles.ingredients}>{dietPlan.meals.lunch.ingredients}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.mealContainer}>
//         <Text style={styles.mealType}>Dinner</Text>
//         <View style={styles.mealContent}>
//           {dietPlan.meals.dinner.image && (
//             <Image source={{ uri: dietPlan.meals.dinner.image }} style={styles.image} />
//           )}
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>{dietPlan.meals.dinner.title}</Text>
//             <Text style={styles.description}>{dietPlan.meals.dinner.description}</Text>
//             <Text style={styles.ingredients}>{dietPlan.meals.dinner.ingredients}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     padding: 10,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   day: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   mealContainer: {
//     marginBottom: 20,
//   },
//   mealType: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   mealContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 2,
//   },
//   ingredients: {
//     fontSize: 12,
//     color: '#777',
//   },
// });

// export default DietPlanCard;
