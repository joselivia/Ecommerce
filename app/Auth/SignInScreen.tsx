import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { account, signIn } from "@/lib/config";
interface Props {
  navigation: NavigationProp<any>;
}
export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Toast.show({ type: "error", text1: "Validation Error", text2: "Enter email and password" });
     }
    setIsSubmitting(true);
    try {
       await signIn(email, password);
      Toast.show({ type: "success", text1: "Login successful" });
      navigation.navigate("tabs");
    } catch (error: any) {
      if (error.message.includes("Rate limit")) {
        Toast.show({ type: "error", text1: "Too Many Requests", text2: "Please try again later" });
      } else {
        Toast.show({ type: "error", text1: "Login Failed", text2: error.message });
      }
  } finally {
      setIsSubmitting(false);
  }}
  return (
    <View style={styles.container}>
      <View style={styles.socialButtons}>  
    <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} />
        <Text style={styles.socialButtonText}>Continue With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-twitter" size={20} color="#1500af" />
        <Text style={styles.socialButtonText}>Continue With Twitter</Text>
      </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your username or email address"
        placeholderTextColor="#777"
        secureTextEntry={false}
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Sign In</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("resetPassword")}>
        <Text style={styles.linkText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
  socialButtons:{
borderWidth: 1,
borderColor: '#a69aff',
borderRadius: 11,
boxShadow: "0 0 10px rgb(185, 244, 195)",
marginBottom: 15
},
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  socialButtonText: {
    color: "#a69aff",
    marginLeft: 10,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "#222",
    marginRight: 10,
    borderRadius: 3,
  },
  checkboxText: {
    color: "white",
    fontSize: 14,
  },
});
