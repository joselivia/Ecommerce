import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Carousel from "react-native-snap-carousel";

interface Product {
  name: string;
  images: string | string[];
  price: number;
  description: string;
  location: string;
}

type RootStackParamList = {
  ProductDetail: { product: Product };
  notification: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({route }: Props) {
  const { product } = route.params;

  const images = Array.isArray(product.images)
    ? product.images
    : product.images.includes(",")
      ? product.images.split(",")
      : [product.images];
  const renderImage = ({ item, index }: { item: string; index: number }) => (
    <View key={index} style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.productImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderImage}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width * 0.8}
        layout="default"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productLocation}>📍 {product.location}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$ {product.price}</Text>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  productImage: { width: "100%", height: 300, resizeMode: "cover", marginBottom: 20 },
  detailsContainer: { flex: 1 },
  productName: { fontSize: 24, fontWeight: "bold", marginBottom: 5, color: "black" },
  productLocation: { fontSize: 16, fontWeight: "500", color: "#555", marginBottom: 10 },
  priceContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  price: { fontSize: 24, fontWeight: "bold", color: "#8000FF" },
  productDescription: { fontSize: 16, color: "black", marginBottom: 20 },
  addToCartButton: { backgroundColor: "#8000FF", padding: 15, borderRadius: 10, alignItems: "center" },
  addToCartButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
