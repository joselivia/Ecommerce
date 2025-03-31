import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList} from "../../lib/types";
import { useCart } from "../components/CartContext";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons"; 

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const flatListRef = useRef<FlatList>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 

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

  const handleImagePress = (image: string) => {
    setSelectedImage(image); 
  };

  const handleCloseModal = () => {
    setSelectedImage(null); 
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
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handleImagePress(item)}
          >
            <Image source={{ uri: item }} style={styles.productImage} />
          </TouchableOpacity>
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
      <Modal
        visible={!!selectedImage} 
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal} 
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
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
  detailsContainer: {
    padding: 16,
  },
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
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8000FF",
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8, 
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1, 
  },
});