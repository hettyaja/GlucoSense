import React from "react";
import ImageButton from './components/ImageButton';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { router } from "expo-router";


 const handleBackButton = () => {
    router.back()
  }
const Subscribe = () => 
    {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageButton
                    source={require("./assets/back.png")}
                    imageSize={{ width: 24, height: 24 }}
                    onPress={() => handleBackButton()}
                />
                <Text style={styles.title}> Simplify Your {"\n"} Blood Glucose Tracking </Text>
            </View>
          
            <View style={styles.subtitle}>
                <Text style={styles.h3}>Unlock Exclusive Features in Our Diabetes Management App!</Text>
            </View>
            
            <View style={styles.list}>
                <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
                <Text style={styles.text}>Generate Detailed Reports: Export your data to PDF or CSV for easy sharing.  </Text>
            </View>

            <View style={styles.list}>
                <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
                <Text style={styles.text}>Order Diet Plans: Get diet plan tailored to your needs.  </Text>
            </View>

            <View style={styles.list}>
                <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
                <Text style={styles.text}>Quick Food Logging: Scan barcodes to effortlessly track your meals.  </Text>
            </View>

            <View style={styles.list}>
                <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
                <Text style={styles.text}>Insightful Graphs: Visualize the correlation between your diet and glucose levels.  </Text>
            </View>

            <View style={styles.list}>
                <AntDesign name='checkcircleo' size={24} color='#E04530' style={styles.icon}/>
                <Text style={styles.text}>Insulin Estimation: Get accurate metrics on influence of insulin injection. </Text>
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
        paddingBottom:30, 
        padding: 24 ,  
        paddingTop: 70,   
    },

    title:{
        fontSize:30,
        paddingTop:50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },

    list:{
        paddingLeft:24,
        paddingTop:30,
        backgroundColor:"white",
        flexDirection:'row',
    },

    text:{
        
        fontSize:16,
        fontWeight: '600', // Changed to string
        textAlign:'left',
        paddingRight:50,
        fontFamily: "Poppins-Light",
    },

    icon:{
        paddingRight:16
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
        marginTop:100,
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
        textAlign:"center",
        padding : 10,
    },
    button: {
        marginTop:10,
        backgroundColor: '#D96B41',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        width:'80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600', // Changed to string
        textAlign: 'center',
        fontFamily:'Poppins-Bold'
    },
})

export default Subscribe;
