import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { appwriteConfig,databases,storage } from '@/lib/config';
import { ID } from 'react-native-appwrite';
interface Props {
  navigation: NavigationProp<any>;
}

export default function CreateProductScreen({ navigation }: Props) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.productsCollectionId
      );
      setProducts(response.documents);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
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
            type: 'image/jpeg',
            size: blob.size,
            uri,
          });
          return storage.getFilePreview(appwriteConfig.storageId, file.$id);
        })
      );
      return uploadedImages;
    } catch (error) {
      console.error('Image upload error:', error);
      return [];
    }
  };

  const handleSubmit = async () => {
    if (!productName || !price || !description || images.length === 0) {
      alert('Please fill in all fields and select images.');
      return;
    }
    try {
      const uploadedImages = await uploadImages();
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.productsCollectionId,
        ID.unique(),
        {
          name: productName,
          price: price,
          description: description,
          images: uploadedImages,
        }
      );
      alert('Product uploaded successfully!');
      setProductName('');
      setPrice('');
      setDescription('');
      setImages([]);
      fetchProducts();
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Product</Text>
      </View>

      <TextInput style={styles.input} placeholder="Product Name" value={productName} onChangeText={setProductName} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.textArea} placeholder="Description" value={description} onChangeText={setDescription} multiline />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick Images</Text>
      </TouchableOpacity>

      <FlatList
        data={images}
        horizontal
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.previewImage} />}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Upload Product</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Your Uploaded Products</Text>
      {products.map((product, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: product.images[0] }} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{product.name}</Text>
            <Text style={styles.cardPrice}>${product.price}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  input: { backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 },
  textArea: { backgroundColor: 'white', padding: 10, borderRadius: 5, height: 100, textAlignVertical: 'top', marginBottom: 10 },
  imagePicker: { backgroundColor: '#8000FF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  imagePickerText: { color: 'white', fontWeight: 'bold' },
  previewImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  submitButton: { backgroundColor: '#00A86B', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  cardImage: { width: 80, height: 80, borderRadius: 10 },
  cardDetails: { marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardPrice: { fontSize: 14, color: '#777' },
});
