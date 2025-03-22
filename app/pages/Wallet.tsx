import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

export default function WalletScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.spacer} /> 
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity onPress={() => navigation.navigate("notification")}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spacer: {
    width: 24, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flex: 1,
  },
});

