import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '../../constants/images';
import ImageButton from '../../components/ImageButton'
import { useAuth } from '../context/authContext'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password)
    } catch (error) {
      Alert.alert('Login Failed', error.message)
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white", alignItems:"center"}}>
      <View style={{backgroundColor:"white", alignItems:'flex-start', width:"100%", paddingHorizontal:20}}>
        <ImageButton
          source={require("../../assets/back(2).png")}
          imageSize={{width:24, height:24}}
          onPress={() => router.back('/welcomePage')}
        />
      </View>

      <Image source={images.logo} style={{marginBottom:60}}/>

      <View style={{backgroundColor:"white", alignItems:'flex-start', width:"100%", paddingHorizontal:50}}>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14}}>Email</Text>
      </View>
      
      <TextInput style={[styles.input, {color: "black"}]}
        placeholder="Enter your email"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
      />
      
      <View style={{backgroundColor:"white", flexDirection: 'row', justifyContent:"space-between", width:'100%', paddingHorizontal:50}}>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14}}>Password</Text>
      </View>

      <TextInput style={[styles.input, {color: "black"}]}
        placeholder="Enter your password"
        placeholderTextColor="black"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
      />
      
      <View style={{backgroundColor:"white", flexDirection: 'row-reverse', justifyContent:"space-between", width:'100%', paddingHorizontal:50}}>
        <TouchableOpacity onPress={() => router.push('/(resetPwd)/resetPwd1')}>
            <Text style={{ alignItems:'center', fontFamily: 'Poppins-Medium', fontSize: 12, paddingBottom: 35, color: '#808080', justifyContent: 'center', textAlign: 'center', fontFamily:'Poppins-Medium'}}>Forgot Password?</Text>
        </TouchableOpacity> 
      </View>

      <TouchableOpacity onPress={handleLogin} style={{paddingTop:90, paddingVertical:30}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
      

      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12}}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => router.push('/preReg')}>
            <Text style={{ alignItems:'center', fontFamily: 'Poppins-Medium', fontSize: 12, paddingBottom: 35, color: '#0044CC', justifyContent: 'center', textAlign: 'center', fontFamily:'Poppins-Medium'}}> Sign Up </Text>
      </TouchableOpacity> 

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 36,
    width: 336,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    opacity: 0.5,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#D96B41",
    width: 164,
    height: 42,
    borderRadius: 8,
    justifyContent: "center", // Vertically center content
    alignItems: "center", // Horizontally center content
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textTransform: "none", // Set text to lowercase
  },
});

export default Login;
