import React, { useState} from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity,  FlatList, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ID } from 'react-native-appwrite';
import { appwriteConfig, databases, storage } from '../../lib/config'; 

export default function CreateProductScreen() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!productName || !price || !description||!location || images.length === 0) {
      alert('Please fill in all fields and select images.');
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("📤 Uploading images...");
      const uploadedImages = await uploadImages();
      if (uploadedImages.length === 0)
        throw new Error("No images uploaded.");
      
      console.log("✅ Uploaded Images:", uploadedImages);
    const newProduct=  await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.productsCollectionId,
        ID.unique(),
        {
          name: productName,
          price: parseFloat(price),
          location:location,
          description: description,
          images:JSON.stringify(uploadedImages),
        }
      );
      console.log("✅ Product created successfully:", newProduct);
      alert('Product uploaded successfully!');
      setProductName('');
      setPrice('');
      setDescription('');
      setImages([]);
      } catch (error:any) {
        console.error("❌ Error uploading product:", error.message || error);
        alert("Failed to upload product. Please try again.");
    }
    finally{
      setIsSubmitting(false)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
              <Text style={styles.title}>Create Product</Text>
      </View>

      <TextInput style={styles.input} placeholder="Product Name" value={productName} onChangeText={setProductName} />
          <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={styles.textArea} placeholder="Description" value={description} onChangeText={setDescription} multiline />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick Images</Text>
      </TouchableOpacity>

      <FlatList
        data={images}
        horizontal
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.previewImage} />}
      />
     <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={styles.submitButtonText}>Upload Product</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'center',  marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  input: { backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 },
  textArea: { backgroundColor: 'white', padding: 10, borderRadius: 5, height: 100, textAlignVertical: 'top', marginBottom: 10 },
  imagePicker: { backgroundColor: '#8000FF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  imagePickerText: { color: 'white', fontWeight: 'bold' },
  previewImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  submitButton: { backgroundColor: '#00A86B', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
});
