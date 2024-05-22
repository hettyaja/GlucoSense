<<<<<<< HEAD
// import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable} from 'react-native'
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Link, router} from 'expo-router'
// import { images } from '../../constants/images';
// import { Picker } from '@react-native-picker/picker';
=======
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
>>>>>>> 4991813e0b20b7acdfdc15f66c53121f03c9c406

// const preReg = () => {
//   const [selectedButton, setSelectedButton] = useState(null);
//   const [selectedValue, setSelectedValue] = useState("Breakfast");

//   const handleButtonPress = (buttonIndex) => {
//     setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
//   }
//   return (
//     <View style={{flex:3, backgroundColor:'#E58B68', paddingTop:24}}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
//         <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center', marginLeft: 60}}>Add Meal</Text>
//         <TouchableOpacity onPress = {() => router.push('login/viewDiary')}>
//           <View style={styles.saveButtonContainer}>
//             <Text style={{ color: 'white',fontFamily: 'Poppins-Regular', fontSize: 16, marginRight: 10}}>Save</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//         <View style = {{backgroundColor: '#f5f5f5', marginTop: 8}}>
//           <View style={styles.container1}>
//             <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 20, marginVertical: 10}}> Time</Text>
//             <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
//             <View style = {{flexDirection: 'row'}}>
//               <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 15, marginLeft: 20}}> Period</Text>
//               <Picker
//                 selectedValue={selectedValue}
//                 style={styles.picker}
//                 itemStyle={styles.pickerItem}
//                 onValueChange={(itemValue) => setSelectedValue(itemValue)}
//                 >
//                   <Picker.Item label="Breakfast" value="Breakfast" />
//                   <Picker.Item label="Lunch" value="Lunch" />
//                   <Picker.Item label="Dinner" value="Dinner" />
//                 </Picker>
//             </View>
//           </View>
//           <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
//             <TouchableOpacity style={{borderColor: '#808080',backgroundColor: "#ffffff",width: 160,height: 70,paddingVertical: 10,paddingHorizontal: 20,borderBottomLeftRadius: 8, borderRightWidth: 1,
//             borderTopLeftRadius: 8, marginBottom: 10, elevation: 3}}>
//               <Text style={styles.buttonText}>Search</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={{borderColor: '#808080', backgroundColor: "#ffffff",width: 160,height: 70,paddingVertical: 10,paddingHorizontal: 20,borderBottomRightRadius: 8, borderLeftWidth: 1,
//             borderTopRightRadius: 8, marginBottom: 10, elevation: 3}}>
//               <Text style={styles.buttonText}>Scan</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{ marginTop: 10,backgroundColor: 'white',paddingVertical: 12,paddingHorizontal: 30,
//             elevation: 3,borderColor: '#808080', width: 320, alignSelf: 'center', borderRadius: 8, flexDirection: 'row'}}>
//               <Text>Fried Rice</Text>
//               <Text style={{marginLeft: 120, color: '#808080'}}>1 Serving</Text>
//           </View>
//           <View style={{ marginTop: 20, backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between',
//             borderColor: '#808080'}}>
//             <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
//               <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 20, marginVertical: 3}}>Calories</Text>
//               <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12,  marginRight: 40, marginTop: 6}}>Cal</Text>
//             </View>
//             <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
//             <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
//               <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Carbs</Text>
//               <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6, marginRight: 40}}>g</Text>
//             </View>
//             <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
//             <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
//               <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Protein</Text>
//               <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6,  marginRight: 40}}>g</Text>
//             </View>
//             <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
//             <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
//               <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Fat</Text>
//               <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6,  marginRight: 40}}>g</Text>
//             </View>
//             <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
//               <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Notes{"\n\n\n"}</Text>
//             </View>
//           <Text>{"\n\n\n\n\n\n\n"}</Text>
//         </View>
//     </View>
    
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'space-around',
//   },
//   selectedButton: {
//     backgroundColor: '#FAF5E1',
//     borderColor: '#E58B68', 
//   },
//   buttonText: {
//     fontSize:12,
//     fontFamily:"Poppins-Regular",
//     textAlign: 'center',
//     color: 'black',
//   },
//   saveButtonContainer: {
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 3, // Adjust the padding to increase the width
//     paddingLeft: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   container1: {
//     marginTop: 25,
//     backgroundColor: 'white',
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#808080'
//   },
//   picker: {
//     fontFamily: 'Poppins-Regular',
//     width: '50%',
//     marginLeft: 220,
//     color: '#808080',
//   },
//   pickerItem: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//   },
// });
// export default preReg