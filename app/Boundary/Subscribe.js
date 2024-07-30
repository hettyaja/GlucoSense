import React from "react";
import ImageButton from '../components/ImageButton';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { router } from "expo-router";
import Header from "../components/Header";


 const handleBackButton = () => {
    router.back()
  }
 
const Subscribe = () => 
    {
    const navigation = useNavigation();

    return (
        <>
        <Header
            title=''
            leftButton='Back'
            onLeftButtonPress={() => router.push(handleBackButton)}
        />
        <View style={styles.container}>
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
                    onPress={() => router.push('./Subscription')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
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
        padding: 20 ,  
        paddingTop: 30,   
    },

    title:{
        fontSize:30,
        paddingTop:30,
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
        textAlign:'left',
        paddingRight:50,
        fontFamily: "Poppins-Regular",
    },

    icon:{
        paddingRight:16
    },

    subtitle:{
        paddingTop:12,
        backgroundColor:"white",
    },
    h3:{
        fontSize:24,
        fontFamily:"Poppins-Bold",
        paddingHorizontal:16
    }, 
    price:{
        backgroundColor:'#ffff',
        marginTop:100,
        paddingBottom:180,
        borderRadius:24,
        // borderWidth: 10,
        // borderColor: 'red',
        alignItems:'center',
        justifyContent:'center',
        elevation: 10, // Adjust the value to increase or decrease the shadow
        shadowColor: '#000',
        borderWidth: 0.5,
        borderColor: '#808080',
        shadowOffset: { width: -50, height: -40000 }, // This creates the illusion of the shadow at the top
    },

    tag:{
        fontSize:16,
        fontFamily: "Poppins-Medium",
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
