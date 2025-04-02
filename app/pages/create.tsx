import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker"; // Import Picker
import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage, getCurrentUser, User } from "../../lib/config";
import Toast from "react-native-toast-message";
import { NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


interface Props {
  navigation: NavigationProp<any>;
}

export default function CreateProductScreen({ navigation }: Props) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const categories = [
    { label: "Select a category...", value: "" }, 
    { label: "Electronics & Gadgets", value: "electronics_gadgets" },
    { label: "Fashion & Apparel", value: "fashion_apparel" },
    { label: "Footwear (Shoes & Sneakers)", value: "footwear" },
    { label: "Home & Living", value: "home_living" },
    { label: "Beauty & Personal Care", value: "beauty_personal_care" },
    { label: "Health & Wellness", value: "health_wellness" },
    { label: "Food & Groceries", value: "food_groceries" },
    { label: "Baby & Kids", value: "baby_kids" },
    { label: "Sports & Outdoors", value: "sports_outdoors" },
    { label: "Automotive & Tools", value: "automotive_tools" },
    { label: "Books & Stationery", value: "books_stationery" },
    { label: "Gaming & Entertainment", value: "gaming_entertainment" },
    { label: "Pet Supplies", value: "pet_supplies" },
  ];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const pickImage = async () => {
    if (images.length >= 3) {
      Toast.show({
        type: "info",
        text1: "Limit Reached",
        text2: "You can only upload a maximum of 3 images.",
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      const remainingSlots = 3 - images.length;
      const imagesToAdd = newImages.slice(0, remainingSlots);
      setImages([...images, ...imagesToAdd]);

      if (newImages.length > remainingSlots) {
        Toast.show({
          type: "info",
          text1: "Image Limit Applied",
          text2: `Only ${remainingSlots} image(s) were added. Max limit is 3.`,
        });
      }
    }
  };

  const removeImage = (uri: string) => {
    setImages(images.filter((image) => image !== uri));
    Toast.show({
      type: "info",
      text1: "Image Removed",
      text2: "The selected image has been removed.",
    });
  };

  const uploadImages = async () => {
    try {
      const uploadedImages = await Promise.all(
        images.map(async (uri) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          const fileId = ID.unique();
          const file = await storage.createFile(appwriteConfig.storageId, fileId, {
            name: `${fileId}.jpg`,
            type: "image/jpeg",
            size: blob.size,
            uri,
          });

          return storage.getFilePreview(appwriteConfig.storageId, file.$id).toString();
        })
      );
      return uploadedImages;
    } catch (error) {
      console.error("Image upload error:", error);
      return [];
    }
  };

  const handleSubmit = async () => {
    if (!productName || !price || !description || !location || !category || images.length === 0 || !user) {
      alert("Please fill in all fields, select a category, at least one image, and ensure you are logged in.");
      return;
    }

    setIsSubmitting(true);
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser || !currentUser.accountId) {
        throw new Error("User not found. Please log in again.");
      }

      const uploadedImages = await uploadImages();
      if (uploadedImages.length === 0) throw new Error("No images uploaded.");

      const newProduct = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.productsCollectionId,
        ID.unique(),
        {
          name: productName,
          price: parseFloat(price),
          location,
          description,
          category, 
          images: uploadedImages,
          users: currentUser.id,
        }
      );

      Toast.show({ type: "success", text1: "Product uploaded successfully" });
      setProductName("");
      setPrice("");
      setLocation("");
      setDescription("");
      setCategory(""); 
      setImages([]);
      navigation.navigate("tabs");
      return newProduct;
    } catch (error: any) {
      alert("Failed to upload product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.previewImage} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeImage(item)}
      >
        <Ionicons name="close-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Product</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue as string)}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick Images (Max 3)</Text>
      </TouchableOpacity>

      <FlatList
        data={images}
        style={styles.imageList}
        horizontal
        renderItem={renderImageItem}
        keyExtractor={(item) => item}
        ListEmptyComponent={<Text style={styles.emptyText}>No images selected yet.</Text>}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Upload Product</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f8f9fa", flex: 1 },
  header: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "black" },
  input: { backgroundColor: "white", borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  textArea: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  imagePicker: {
    backgroundColor: "#8000FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePickerText: { color: "white", fontWeight: "bold" },
  imageList:{ borderWidth:2 ,borderRadius: 5, margin: 3,},
  imageContainer: { position: "relative", padding: 2, margin: 10, },
  previewImage: { width: 80, height: 80, borderRadius: 10, borderWidth: 2 },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: "#00A86B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 100,
  },
  submitButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center" },
});