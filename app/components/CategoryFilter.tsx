import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface Category {
  name: string;
  subcategories: string[];
}
export default function CategoriesFilterScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<Record<string, boolean>>({});
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const categories: Category[] = [
    {
      name: 'Clothing',
      subcategories: ['Dresses', 'Pants', 'Skirts', 'Shorts', 'Jackets', 'Hoodies', 'Shirts', 'Polo', 'T-Shirts', 'Tunics'],
    },
    { name: 'Shoes', subcategories: [] },
    { name: 'Bags', subcategories: [] },
    { name: 'Lingerie', subcategories: [] },
    { name: 'Accessories', subcategories: [] },
  ];
  const toggleCategory = (category: string) => {
    setIsCategoryExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleGenderPress = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>27 Categories Filter</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>All Categories</Text>
        <View style={styles.filterOptions}>
          <TouchableOpacity
            style={[styles.filterOption, selectedGender === 'All' && styles.selectedOption]}
            onPress={() => handleGenderPress('All')}
          >
            <Text style={styles.filterOptionText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterOption, selectedGender === 'Female' && styles.selectedOption]}
            onPress={() => handleGenderPress('Female')}
          >
            <Text style={styles.filterOptionText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterOption, selectedGender === 'Male' && styles.selectedOption]}
            onPress={() => handleGenderPress('Male')}
          >
            <Text style={styles.filterOptionText}>Male</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryHeader} onPress={() => toggleCategory(item.name)}>
              <View style={styles.categoryImage}></View>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Ionicons
                name={isCategoryExpanded[item.name] ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
            {isCategoryExpanded[item.name] && (
              <View style={styles.subcategories}>
                {item.subcategories.map((subcategory) => (
                  <TouchableOpacity key={subcategory} style={styles.subcategory}>
                    <Text style={styles.subcategoryText}>{subcategory}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginLeft: -10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginRight: -10,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#ccc',
  },
  filterOptionText: {
    fontSize: 14,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    backgroundColor: '#eee', 
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subcategories: {
    paddingHorizontal: 20,
  },
  subcategory: {
    paddingVertical: 10,
  },
  subcategoryText: {
    fontSize: 14,
  },
});
