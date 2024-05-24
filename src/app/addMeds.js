// import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Link, router} from 'expo-router'
// import { images } from '../../constants/images';
// import { Picker } from '@react-native-picker/picker';

// const preReg = () => {
//   const [selectedButton, setSelectedButton] = useState(null);
//   const [selectedValue, setSelectedValue] = useState("Breakfast");
//   const [value, setValue] = useState('1');
    
//     const handleChange = (text) => {
//       // Allow only numbers and limit length to 2
//       const newText = text.replace(/[^0-9]/g, '');
//       if (newText.length <= 2) {
//         setValue(newText);
//       }
//     };
//   const handleButtonPress = (buttonIndex) => {
//     setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
//   }
//   return (
//     <View style={{flex:3, backgroundColor:'#E58B68', paddingTop:24}}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
//         <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center', marginLeft: 60}}>Add Meds</Text>
//         <TouchableOpacity onPress = {() => router.push('login/addMeds')}>
//           <View style={styles.saveButtonContainer}>
//             <Text style={{ color: 'white',fontFamily: 'Poppins-Regular', fontSize: 16, marginRight: 10}}>Save</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//         <View style = {{backgroundColor: '#f5f5f5', marginTop: 8, height: 700}}>
//           <View style={styles.container1}>
//             <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 20, marginVertical: 10}}> Time</Text>
//           </View>
//           <View style={{backgroundColor: '#ffffff', width: 350, borderRadius: 8, elevation: 3, alignSelf: 'center',  marginTop: 20}}>
//             <View style={{flexDirection: 'row', marginVertical: 10, justifyContent:'space-between'}}>
//               <Text style={styles.text}>ABC Pills</Text>
//               <TextInput style={{marginLeft: 160, fontFamily: 'Poppins-Medium', fontSize: 14}}defaultValue={value} onChangeText={handleChange} keyboardType="numeric" maxLength={3} color= "#808080"></TextInput>
//               <Text style={styles.textUnits}>Units</Text>            
//             </View>
//             <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 350, alignSelf: 'center'}}/>
//             <Link href="login/createMeds" style={{fontFamily: 'Poppins-Medium', fontSize: 14, color: '#E58B68', alignSelf: 'center', marginVertical: 10}}>Create Medicine</Link>
//           </View>  
//             <View style={{ marginTop: 20, backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between',
//               borderColor: '#808080'}}>
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
//     marginLeft: 170,
//     color: '#808080',
//   },
//   pickerItem: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//   },
//   text: {
//     marginLeft: 30,
//     fontFamily: 'Poppins-Medium',
//     fontSize: 14
//   },
//   textUnits:{
//     color: '#808080', 
//     textAlign: 'center', 
//     fontFamily: 'Poppins-Medium', 
//     fontSize: 14,
//     marginRight: 30,
//   }
// });
// export default preReg
