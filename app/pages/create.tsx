import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<any>;
}

export default function CreateScreen ({navigation}:Props) {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.Title}>Create</Text>
                <TouchableOpacity onPress={() => navigation.navigate("notification")}>
                  <Ionicons name="notifications-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
     
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  Title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },


  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 15,
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productSize: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  deleteIcon: {
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#8000FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

