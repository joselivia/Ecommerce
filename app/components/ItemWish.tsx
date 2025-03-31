import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<any>;
}
export const mockDatabase = [
  {
    id: '1',
    name: 'Nike T-Shirt',
    size: 'L',
    price: 29.99,
    image: require('../../assets/images/icon.png'), 
  },
  {
    id: '2',
    name: 'Levi\'s Jeans',
    size: '32',
    price: 59.99,
    image: require('../../assets/images/icon.png'), 
  },
  {
    id: '3',
    name: 'Adidas Sneakers',
    size: '10',
    price: 79.99,
    image: require('../../assets/images/icon.png'), 
  },
];

export default function ItemWishScreen () {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setWishlistItems(mockDatabase);
    }, 2000);
  }, []);

  const handleDelete = (id: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    console.log(`Item with ID: ${id} added to cart`);
  };

  return (
    <View style={styles.container}>
      {wishlistItems.length === 0 ? (
        <Text style={styles.loadingText}>Loading Wishlist...</Text>
      ) : (
        <ScrollView>
          {wishlistItems.map(item => (
            <View key={item.id} style={styles.card}>
              <Image
                source={item.image} 
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productSize}>Size: {item.size}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.rightSection}>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteIcon}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

