import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Subscribe = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Simplify Your {"\n"} Blood Glucose Tracking </Text>
            </View>
          
          <View style={styles.subtitle}>
            <Text style={styles.h3}>Unlock Exclusive Features in Our Diabetes Management App!</Text>
          </View>
          <View style={styles.list}>
            <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
            <Text style={styles.text}> Generate Detailed Reports: Export your {"\n"} data to PDF or CSV for easy sharing.  </Text>
          </View>

          <View style={styles.list}>
            <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
            <Text style={styles.text}> Order Diet Plans: Get diet plan tailored to your needs.  </Text>
          </View>

          <View style={styles.list}>
            <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
            <Text style={styles.text}> Quick Food Logging: Scan barcodes to {"\n"} effortlessly track your meals.  </Text>
          </View>

          <View style={styles.list}>
            <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
            <Text style={styles.text}> Insightful Graphs: Visualize the {"\n"} correlation between your diet and glucose levels.  </Text>
          </View>

          <View style={styles.list}>
            <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
            <Text style={styles.text}> Automatically Input edit aing  </Text>
          </View>

          <View style={styles.price}>
            <Text style={styles.tag}>Only $4.00 per month</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => Alert.alert('Button pressed')}
            >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
          </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffff',
    },
    header:{
        backgroundColor: '#E58B68',
        paddingTop:80,
        paddingBottom:50,
        borderRadius:8,  
        padding: 24      
    },

    title:{
        fontSize:32,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        paddingTop:40
    },

    list:{
        paddingLeft:16,
        paddingTop:30,
        backgroundColor:"white",
        flexDirection:'row',
    },

    text:{
      fontSize:16,
      fontWeight:600,
      textAlign:'left',
      paddingRight:50,
      fontFamily: "Poppins-Medium",
    },

    icon:{
        paddingRight:8
    },

    subtitle:{
        paddingTop:12,
        backgroundColor:"white",
    },
    h3:{
        fontSize:18,
        fontFamily:"Poppins-Bold",
        paddingLeft:16
    }, 
    price:{
        backgroundColor:'#ffff',
        marginTop:80,
        paddingTop:30,
        paddingBottom:100,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',

         // Adding shadow for iOS
        shadowColor: '#000',
        shadowOffset: {
         width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Adding shadow for Android
    },

    tag:{
        fontSize:12,
        fontFamily: "Poppins-Regular",
        textAlign:"center"
    },
    button: {
        marginTop:20,
        backgroundColor: '#D96B41',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        width:'80%',

       
        
        
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600', // Semi-bold
        textAlign: 'center',
        fontFamily:'Poppins-Bold'
        
      },
    

})
export default Subscribe