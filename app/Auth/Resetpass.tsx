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
      <Text style={styles.title}>Reset Your Password</Text>
    <View>
        <Text>Enter your email and a link will be send to reset your password.</Text>
    </View>
<View>
    <Text>Email Address</Text>
</View>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#777"
        secureTextEntry={false}
      />

<TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.linkText}>Back to </Text>
        <Text style={styles.loginText}>Login</Text>
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    color: "#8000FF",
    textAlign: "center",
    marginTop: 10,
  },
  loginText: {
    color: 'blue',
  },
  
});
