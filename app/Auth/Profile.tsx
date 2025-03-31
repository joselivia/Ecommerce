import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getCurrentUser } from "@/lib/config";

export default function UserInfo() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#8000FF" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={styles.label}>Full Name</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{user?.username || "N/A"}</Text>
      </View>

      <Text style={styles.label}>Email Address</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{user?.email || "N/A"}</Text>
      </View>

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{user?.phone || "N/A"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  infoBox: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
