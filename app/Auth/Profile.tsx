import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { databases, storage, appwriteConfig, getCurrentUser, User } from "@/lib/config";
import { Query, ID, Models } from "react-native-appwrite";
import { Feather } from "@expo/vector-icons";
import { formatPrice } from "@/lib/types";

interface Product extends Models.Document {
  name: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  users: User | string;
}

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const userData = await getCurrentUser();
        console.log("Fetched user data:", userData); 
        setUser(userData);
        const userProducts = await databases.listDocuments<Product>(
          appwriteConfig.databaseId,
          appwriteConfig.productsCollectionId,
          [Query.equal("users", userData.id)]
        );
        setProducts(userProducts.documents);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndProducts();
  }, []);

  const uploadAvatar = async () => {
    setAvatarUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && user) {
        const uri = result.assets[0].uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        const fileId = ID.unique();
        const file = await storage.createFile(appwriteConfig.storageId, fileId, {
          name: `${fileId}.jpg`,
          type: "image/jpeg",
          size: blob.size,
          uri,
        });

        const avatarUrl = storage.getFilePreview(appwriteConfig.storageId, file.$id).toString();

        console.log("Updating user with ID:", user.id); 
        if (!user.id) {
          throw new Error("User document ID is missing");
        }

        const updatedUser = await databases.updateDocument<User>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          user.id, 
          { avatar: avatarUrl }
        );
        setUser(updatedUser); 
        Alert.alert("Success", "Avatar updated successfully!");
      }
    } catch (err: any) {
      console.error("Avatar upload error:", err);
      Alert.alert("Error", "Failed to upload avatar: " + (err.message || "Unknown error"));
    } finally {
      setAvatarUploading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.productsCollectionId,
                productId
              );
              setProducts(products.filter((p) => p.$id !== productId));
              Alert.alert("Success", "Product deleted successfully!");
            } catch (err: any) {
              Alert.alert("Error", "Failed to delete product: " + err.message);
            }
          },
        },
      ]
    );
  };

  const editProduct = (product: Product) => {
    Alert.alert("Edit Product", `Editing ${product.name} (Functionality TBD)`);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
      </View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          Alert.alert(
            item.name,
            "Choose an action",
            [
              { text: "Edit", onPress: () => editProduct(item) },
              { text: "Delete", style: "destructive", onPress: () => deleteProduct(item.$id) },
              { text: "Cancel", style: "cancel" },
            ],
            { cancelable: true }
          )
        }
      >
        <Feather name="more-vertical" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#8000FF" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={uploadAvatar} disabled={avatarUploading}>
            <Image
              source={{ uri: user?.avatar || "https://via.placeholder.com/150" }}
              style={styles.avatar}
            />
            {avatarUploading && (
              <ActivityIndicator size="small" color="#8000FF" style={styles.avatarLoading} />
            )}
          </TouchableOpacity>
          <Text style={styles.changeAvatarText}>Tap to change avatar</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>Total Products: {products.length}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
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

        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Your Products</Text>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.$id}
            scrollEnabled={false}
            ListEmptyComponent={<Text style={styles.emptyText}>No products uploaded yet.</Text>}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20 },
  avatarContainer: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#ccc",
    padding: 5,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#8000FF" },
  avatarLoading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  changeAvatarText: { color: "#8000FF", marginTop: 10, fontSize: 14 },
  statsRow: { flexDirection: "row", justifyContent: "center" },
  statsText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  infoContainer: { marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  infoBox: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  infoText: { fontSize: 16, color: "#333" },
  productsContainer: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  productItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { fontSize: 14, color: "#666" },
  menuButton: { padding: 5 },
  emptyText: { fontSize: 16, color: "#666", textAlign: "center" },
  errorText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 20 },
});