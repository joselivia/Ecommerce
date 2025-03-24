import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
interface Props {
  navigation: NavigationProp<any>;
}
export default function ResetPassScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
    <View>
        <Text>Enter your email and a link will be send to reset your password.</Text>
    </View>
<View>
    <Text  style={styles.title}>Email Address</Text>
</View>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#777"
        secureTextEntry={false}
      />

<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Resetverification')}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
  <Text style={styles.linkText}>Back to Login</Text>
</TouchableOpacity>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    marginTop: 3,

  },

  input: {
    color: "black",
    padding: 15,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: "#8000FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  linkText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  loginText: {
    color: 'blue',
  },
  
});
