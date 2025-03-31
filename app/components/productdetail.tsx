import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCart } from "./CartContext"; 
import Toast from "react-native-toast-message"; 

interface Product {
  $id: string; 
  name: string;
  images: string | string[];
  price: number;
  description: string;
  location: string;
}

type RootStackParamList = {
  ProductDetail: { product: Product };
};

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const { addToCart } = useCart(); 
  const flatListRef = useRef<FlatList>(null);

  const images = Array.isArray(product.images)
    ? product.images
    : product.images.includes(",")
    ? product.images.split(",")
    : [product.images];

  const handleAddToCart = () => {
    const imageUrl = Array.isArray(product.images)
      ? product.images[0]
      : product.images; 

    const cartItem = {
      id: product.$id, 
      title: product.name,
      size: "M", 
      price: product.price,
      quantity: 1, 
      image: imageUrl,
    };

    addToCart(cartItem); 
    Toast.show({
      type: "success",
      text1: "Added to Cart",
      text2: `${product.name} has been added to your cart!`,
    });
  };

  return (
    <View style={styles.detailsContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.productImage} />
          </View>
        )}
      />

      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productLocation}>📍 {product.location}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>$ {product.price}</Text>
      </View>
      <Text style={styles.productDescription}>{product.description}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    margin: 10,
    width: Dimensions.get("window").width - 40,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: { padding: 16 },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  productLocation: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  price: { fontSize: 24, fontWeight: "bold", color: "#8000FF" },
  productDescription: { fontSize: 16, color: "black", marginBottom: 20 },
  addToCartButton: {
    backgroundColor: "#8000FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addToCartButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});