import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { createUser} from '@/lib/config';
import Toast from "react-native-toast-message";
interface Props {
  navigation: NavigationProp<any>;
}
export default function SignUpScreen({navigation}: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit=async()=>{
      if(!email || !username || !password ) {
        Toast.show({
          type: "error",
          text1: "Please fill all the fields",
        });return;
  
      }
        setIsSubmitting(true);
    try{  
      
      const newUser = await createUser(email,password,username);
      Toast.show({ type: "success", text1: "Account created successfully" });
 navigation.navigate("signIn");
    }catch(error:any){
        Toast.show({ type: "error", text1:"Signup failed" + error.message });
    } finally{
        setIsSubmitting(false);
    } 
      }
    
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} />
        <Text style={styles.socialButtonText}>Continue With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-twitter" size={20} color="#1500af" />
        <Text style={styles.socialButtonText}>Continue With Twitter</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input} 
        placeholder="Enter your Username"
        placeholderTextColor="#777"
        value={username}
        onChangeText={setUsername}
       />
       <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#777"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
<View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#777" />
        </TouchableOpacity>
      </View>


 
<TouchableOpacity
  style={styles.button}
  onPress={submit}
  disabled={isSubmitting}
>
  {isSubmitting ? (
    <ActivityIndicator color="white" />
  ) : (
    <Text style={styles.buttonText}>Sign Up</Text>
  )}
</TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
  <Text style={styles.linkText}>Already have an account? Log in</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
        padding: 20,
      justifyContent: 'center',
    },

       title: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
         padding: 15,
      borderRadius: 5,
      marginBottom: 15,
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      borderRadius: 5,
      paddingHorizontal: 15,
      marginBottom: 15,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 15,
      color: "black",
      
    },
    socialButtonText: {
      color: '#a69aff',
      marginLeft: 10,
    },
    input: {
      color: 'black',
      padding: 15,
boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      borderRadius: 5,
      marginBottom: 15,
      paddingLeft: 15,
    },
    button: {
      backgroundColor: '#8000FF',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    linkText: {
      color: '#8000FF',
      textAlign: 'center',
      marginTop: 10,
    },

});
