// import React, { useState, useContext } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image,
//   ScrollView,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useNavigation } from '@react-navigation/native';
// import { DietPlanContext } from './DietPlanContext';
// import { Picker } from '@react-native-picker/picker';

// const CreateDietPlan = () => {
//   const { addDietPlan } = useContext(DietPlanContext);
//   const navigation = useNavigation();
//   const [day, setDay] = useState('');
//   const [lunchImage, setLunchImage] = useState(null);
//   const [dinnerImage, setDinnerImage] = useState(null);
//   const [lunchTitle, setLunchTitle] = useState('');
//   const [dinnerTitle, setDinnerTitle] = useState('');
//   const [lunchDescription, setLunchDescription] = useState('');
//   const [dinnerDescription, setDinnerDescription] = useState('');
//   const [lunchIngredients, setLunchIngredients] = useState('');
//   const [dinnerIngredients, setDinnerIngredients] = useState('');

//   const addImage = async (setImage) => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera roll permissions to make this work!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSave = () => {
//     const newDietPlan = {
//       id: Date.now().toString(),
//       day,
//       meals: {
//         lunch: {
//           image: lunchImage,
//           title: lunchTitle,
//           description: lunchDescription,
//           ingredients: lunchIngredients,
//         },
//         dinner: {
//           image: dinnerImage,
//           title: dinnerTitle,
//           description: dinnerDescription,
//           ingredients: dinnerIngredients,
//         },
//       },
//     };
//     addDietPlan(newDietPlan);
//     navigation.navigate('ViewAndSearchDietPlan');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image source={require('./Image/X.png')} style={styles.icon} />
//           </TouchableOpacity>
//           <Text style={styles.title}>Diet Plan</Text>
//           <TouchableOpacity onPress={handleSave}>
//             <Text style={styles.saveText}>Save</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Day</Text>
//           <Picker selectedValue={day} onValueChange={(itemValue) => setDay(itemValue)} style={styles.picker}>
//             <Picker.Item label="Select day" value="" />
//             <Picker.Item label="Monday" value="Monday" />
//             <Picker.Item label="Tuesday" value="Tuesday" />
//             <Picker.Item label="Wednesday" value="Wednesday" />
//             <Picker.Item label="Thursday" value="Thursday" />
//             <Picker.Item label="Friday" value="Friday" />
//             <Picker.Item label="Saturday" value="Saturday" />
//             <Picker.Item label="Sunday" value="Sunday" />
//           </Picker>
//         </View>

//         <View style={styles.mealContainer}>
//           <Text style={styles.mealTitle}>Lunch</Text>
//           <TouchableOpacity onPress={() => addImage(setLunchImage)} style={styles.imageUpload}>
//             {lunchImage ? (
//               <Image source={{ uri: lunchImage }} style={styles.uploadedImage} />
//             ) : (
//               <View style={styles.uploadPlaceholder}>
//                 <Image source={require('./Image/iconCarrier.png')} style={styles.uploadIcon} />
//                 <Text>Upload recipe photo</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//           <TextInput placeholder="Name" value={lunchTitle} onChangeText={setLunchTitle} style={styles.input} />
//           <TextInput placeholder="Description" value={lunchDescription} onChangeText={setLunchDescription} style={styles.input} />
//           <TextInput placeholder="Ingredients" value={lunchIngredients} onChangeText={setLunchIngredients} style={styles.input} />
//         </View>

//         <View style={styles.mealContainer}>
//           <Text style={styles.mealTitle}>Dinner</Text>
//           <TouchableOpacity onPress={() => addImage(setDinnerImage)} style={styles.imageUpload}>
//             {dinnerImage ? (
//               <Image source={{ uri: dinnerImage }} style={styles.uploadedImage} />
//             ) : (
//               <View style={styles.uploadPlaceholder}>
//                 <Image source={require('./Image/iconCarrier.png')} style={styles.uploadIcon} />
//                 <Text>Upload recipe photo</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//           <TextInput placeholder="Name" value={dinnerTitle} onChangeText={setDinnerTitle} style={styles.input} />
//           <TextInput placeholder="Description" value={dinnerDescription} onChangeText={setDinnerDescription} style={styles.input} />
//           <TextInput placeholder="Ingredients" value={dinnerIngredients} onChangeText={setDinnerIngredients} style={styles.input} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1 },
//   container: { padding: 20 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F28B54', paddingVertical: 10, paddingHorizontal: 15 },
//   icon: { width: 24, height: 24 },
//   title: { fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' },
//   saveText: { fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' },
//   inputContainer: { marginVertical: 10 },
//   picker: { height: 50, width: '100%' },
//   mealContainer: { marginTop: 20 },
//   mealTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   imageUpload: { justifyContent: 'center', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 20, marginBottom: 10 },
//   uploadedImage: { width: 100, height: 100, borderRadius: 10 },
//   uploadPlaceholder: { alignItems: 'center' },
//   uploadIcon: { width: 30, height: 30, marginBottom: 10 },
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 },
//   label: { fontSize: 16, marginBottom: 5 },
// });

// export default CreateDietPlan;
