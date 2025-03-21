import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <ScrollView>

        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.notificationItem}>
          <FontAwesome5 name="percent" size={24} color="#ff6f00" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Special Discount</Text>
            <Text style={styles.notificationDescription}>Get 20% off on your next purchase!</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Yesterday</Text>
        <View style={styles.notificationItem}>
          <MaterialIcons name="account-balance-wallet" size={24} color="#4caf50" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>E-Wallet Update</Text>
            <Text style={styles.notificationDescription}>Your e-wallet has been credited with $50.</Text>
          </View>
        </View>
        <View style={styles.notificationItem}>
          <Ionicons name="location" size={24} color="#2196f3" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Location Update</Text>
            <Text style={styles.notificationDescription}>Your order is now in transit.</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>January 23, 2025</Text>
        <View style={styles.notificationItem}>
        <Ionicons name="gift-outline" size={24} color="#9c27b0" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Gift Received</Text>
            <Text style={styles.notificationDescription}>You received a gift card from John Doe.</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>January 22, 2025</Text>
        <View style={styles.notificationItem}>
          <FontAwesome5 name="shopping-bag" size={24} color="#ff9800" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Order Shipped</Text>
            <Text style={styles.notificationDescription}>Your order #12345 has been shipped.</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>January 20, 2025</Text>
        <View style={styles.notificationItem}>
          <MaterialIcons name="security" size={24} color="#e91e63" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Security Alert</Text>
            <Text style={styles.notificationDescription}>A new login to your account was detected.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationText: {
    marginLeft: 15,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
  },
});
