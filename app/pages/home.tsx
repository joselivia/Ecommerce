import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import FilterPopup from "../components/filterpop";
import { getAllProducts } from "@/lib/config";
import useAppwriting from "../../lib/UseAppwrite";
import { useCart } from "../components/CartContext"; 
import Toast from "react-native-toast-message";

interface Product {
  $id: string;
  name: string;
  images: string | string[];
  price: number;
}

interface Props {
  navigation: NavigationProp<any>;
}

export default function HomeScreen({ navigation }: Props) {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { cart, addToCart } = useCart(); 
  const [refreshing, setRefreshing] = useState(false);
  const { data: products = [], refetch } = useAppwriting(getAllProducts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const toggleWishlist = (item: Product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((wishlistItem) => wishlistItem.$id === item.$id);
      if (isInWishlist) {
        Toast.show({
          type: "info",
          text1: "Removed from Wishlist",
          text2: `${item.name} removed from your wishlist`,
        });
        return prevWishlist.filter((wishlistItem) => wishlistItem.$id !== item.$id);
      } else {
        Toast.show({
          type: "success",
          text1: "Added to Wishlist",
          text2: `${item.name} added to your wishlist`,
        });
        return [...prevWishlist, item];
      }
    });
  };
  const handleAddToCart = (item: Product) => {
    const imageUrl =
      Array.isArray(item.images) && item.images.length > 0
        ? item.images[0]
        : typeof item.images === "string"
        ? item.images
        : "https://via.placeholder.com/100";
    const newCartItem = {
      id: item.$id || "unknown-id",
      title: item.name || "Unnamed Product",
      size: "M",
      price: item.price || 0,
      image: imageUrl,
      quantity: 1, 
    };
    addToCart(newCartItem); 
    navigation.navigate("Cart");
  };

  const filteredProducts: Product[] = products.filter((product: Product) => {
    const productName = product.name ? product.name.toLowerCase().trim() : "";
    const selectedCategory = selectedTab.toLowerCase().trim();
    const matchesCategory =
      selectedTab === "All" || productName.includes(selectedCategory);
    const matchesSearch = productName.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProductCard = ({ item }: { item: Product }) => {
    const imageUrl =
      Array.isArray(item.images) && item.images.length > 0
        ? item.images[0]
        : typeof item.images === "string"
        ? item.images
        : "https://via.placeholder.com/100";
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProductDetail", { product: item })}
        >
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
          <TouchableOpacity style={styles.likeIcon} onPress={() => toggleWishlist(item)}>
            <Ionicons
              name={
                wishlist.some((wishlistItem) => wishlistItem.$id === item.$id)
                  ? "heart"
                  : "heart-outline"
              }
              size={20}
              color="#8000FF"
            />
          </TouchableOpacity>
          <Text style={styles.productName}>{item.name || "Unnamed Product"}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>$ {item.price || 0}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
            >
              <Ionicons name="cart" size={24} color="green" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.discoveryText}>Discovery</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("notification")}>
            <Ionicons name="notifications" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>{
     
             
              navigation.navigate("wishlist", { wishlist })
              console.log("Navigating to wishlist with:", wishlist);}}
          >
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
        </View>
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => setIsFilterVisible(true)}
        >
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
            <Text
              style={[styles.tabText, selectedTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderProductCard}
        keyExtractor={(item) => item.$id || Math.random().toString()}
      />
      {isFilterVisible && <FilterPopup onClose={() => setIsFilterVisible(false)} />}
    </View>
  );
}

// Styles remain unchanged
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
  iconContainer: {
    flexDirection: "row",
    gap: 10,
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
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  card: {
    maxWidth: 200,
    minWidth: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    marginBottom: 10,
    marginRight: 10,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  addToCartButton: {
    borderRadius: 10,
    alignItems: "center",
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
    marginLeft: 10,
    color: "black",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  originalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8000FF",
  },
});