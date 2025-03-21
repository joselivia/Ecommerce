import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import FilterPopup from "../components/filterpop";

interface Props {
  navigation: NavigationProp<any>;
}

export default function HomeScreen({ navigation }: Props) {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false); 

  const allProducts = [
    { id: "1", image: require("../../assets/images/icon.png"), name: "T-Shirt", price: "$20", discountPrice: "$15", category: "T-Shirts" },
    { id: "2", image: require("../../assets/images/R.jpeg"), name: "Jeans", price: "$40", discountPrice: "$30", category: "Jeans" },
    { id: "3", image: require("../../assets/images/R.jpeg"), name: "Shoes", price: "$60", discountPrice: "$50", category: "Shoes" },
    { id: "4", image: require("../../assets/images/R.jpeg"), name: "Jacket", price: "$100", discountPrice: "$80", category: "Jackets" },
    { id: "5", image: require("../../assets/images/R.jpeg"), name: "Jeans", price: "$40", discountPrice: "$30", category: "Jeans" },
    { id: "6", image: require("../../assets/images/R.jpeg"), name: "Shoes", price: "$60", discountPrice: "$50", category: "Shoes" },
    { id: "7", image: require("../../assets/images/R.jpeg"), name: "Jacket", price: "$100", discountPrice: "$80", category: "Jackets" },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedTab === "All" || product.category === selectedTab;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProductCard = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity style={styles.likeIcon}>
          <Ionicons name="heart-outline" size={20} color="#8000FF" />
        </TouchableOpacity>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>{item.discountPrice}</Text>
          <Text style={styles.originalPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.discoveryText}>Discovery</Text>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("notification")}>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("wishlist")}>
          <Ionicons name="heart" size={24} color="black" />
        </TouchableOpacity>
        </View>
           </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#777" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <FontAwesome name="microphone" size={20} color="#777" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterIcon} onPress={() => setIsFilterVisible(true)}>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        {["All", "T-Shirts", "Jeans", "Shoes", "Jackets"].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
              <Image source={item.image} style={styles.productImage} />
              <TouchableOpacity style={styles.likeIcon}>
                <Ionicons name="heart-outline" size={20} color="#8000FF" />
              </TouchableOpacity>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>{item.discountPrice}</Text>
                <Text style={styles.originalPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      {isFilterVisible && <FilterPopup onClose={() => setIsFilterVisible(false)} />}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  discoveryText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  iconContainer:{
flexDirection:"row",
gap:10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: "black",
  },
  filterIcon: {
    marginLeft: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#8000FF",
  },
  activeTabText: {
    color: "white",
  },
  tabText: {
    color: "black",
    fontWeight: "bold",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
       },
  card: {
    maxWidth: 200,
    minWidth: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
marginVertical:5,
    marginBottom: 10,
    marginRight: 10,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  likeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
    color: "black",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8000FF",
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#777",
  },
});
