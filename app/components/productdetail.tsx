import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
interface Product {
  name: string;
  image: any;
  price: string;
  discountPrice: string;
}

type RootStackParamList = {
  ProductDetail: { product: Product };
  notification: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;
export default function ProductDetailScreen({ navigation, route }: Props) {
  const { product } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Product Detail</Text>
        <TouchableOpacity onPress={() => navigation.navigate("notification")}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image source={product.image} style={styles.productImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>{product.discountPrice}</Text>
          <Text style={styles.originalPrice}>{product.price}</Text>
        </View>
        <Text style={styles.productDescription}>
          This is a great {product.name} that you will love to wear. It is made
          from high-quality materials and offers exceptional comfort and style.
        </Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  
  },
  title: { fontSize: 18, fontWeight: "bold" },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  discountPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8000FF",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "#777",
  },
  productDescription: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#8000FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
