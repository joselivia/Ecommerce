import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<any>;
}
export default function SignUpScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
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
        placeholder="Enter your email address"
        placeholderTextColor="#777"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#777"
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkbox} />
        <Text style={styles.checkboxText}>Agree to our Terms of use and Privacy Policy</Text>

      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkbox} />
        <Text style={styles.checkboxText}>Agree to our Terms of use and Privacy Policy</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    checkbox: {
      width: 20,
      height: 20,
      backgroundColor: '#222',
      marginRight: 10,
      borderRadius: 3,
    },
    checkboxText: {
      color: '#777',
      fontSize: 14,
    },
});
