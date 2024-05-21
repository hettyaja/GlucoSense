// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const RecipeManagementPage = ({ route, navigation }) => {
//   const { recipe } = route.params || {};

//   const recipes = [
//     { id: '1', title: 'Mie Goreng', price: '$9', sold: '52 sold', image: require('./assets/mie.png') },
//     { id: '2', title: 'Chicken Rice', price: '$10', sold: '75 sold', image: require('./assets/chicken.png') },
//     ...(recipe ? [{ id: '3', ...recipe, image: { uri: recipe.image }, sold: '0 sold' }] : []),
//   ];

//   const drafts = [
//     { id: '4', title: 'Nasi Lemak', price: '$8', sold: '30 sold', image: require('./assets/lemak.png') },
//   ];

//   const [selectedTab, setSelectedTab] = React.useState('Recipe');

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('./assets/rectangle.png')}
//         style={styles.header}
//         imageStyle={styles.headerImage}
//       >
//         <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
//           <Icon name="close" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Menu & Recipe Management</Text>
//         <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('CreateRecipe')}>
//           <Icon name="add" size={24} color="#fff" />
//         </TouchableOpacity>
//       </ImageBackground>
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'Recipe' && styles.selectedTab]}
//           onPress={() => setSelectedTab('Recipe')}
//         >
//           <Text style={styles.tabText}>Recipe</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'Draft' && styles.selectedTab]}
//           onPress={() => setSelectedTab('Draft')}
//         >
//           <Text style={styles.tabText}>Draft</Text>
//         </TouchableOpacity>
//       </View>
//       <TextInput style={styles.searchBox} placeholder="Search Menu" />
//       <FlatList
//         data={selectedTab === 'Recipe' ? recipes : drafts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.recipeItem}>
//             {item.image && <Image source={item.image} style={styles.recipeImage} />}
//             <View style={styles.textContainer}>
//               <Text style={styles.recipeTitle}>{item.title}</Text>
//               <Text style={styles.recipePrice}>{item.price}</Text>
//               <Text style={styles.recipeSold}>{item.sold}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     height: 150,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     backgroundColor: '#FFA500', // Add background color as fallback
//   },
//   headerImage: {
//     resizeMode: 'cover',
//   },
//   closeButton: {
//     padding: 8,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   plusButton: {
//     backgroundColor: '#000',
//     padding: 8,
//     borderRadius: 50,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: '#F0F0F0',
//     paddingVertical: 10,
//   },
//   tabButton: {
//     marginHorizontal: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   selectedTab: {
//     backgroundColor: '#FFA500',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   searchBox: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     margin: 16,
//     borderRadius: 20,
//     paddingLeft: 16,
//   },
//   recipeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   recipeImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//   },
//   textContainer: {
//     marginLeft: 16,
//   },
//   recipeTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   recipePrice: {
//     color: 'gray',
//   },
//   recipeSold: {
//     color: 'gray',
//   },
// });

// export default RecipeManagementPage;
