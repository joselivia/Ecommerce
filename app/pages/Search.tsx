import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

interface Product {
  id: string;
  image: any; 
  name: string;
  price: string;
  discountPrice?: string;
}

interface Props {
  navigation: NavigationProp<any>;
}

export default function SearchScreen({ navigation}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: "1",
      image: require("../../assets/images/icon.png"),
      name: "Regular Fit Slogan",
      price: "$1,190",
    },
    {
      id: "2",
      image: require("../../assets/images/R.jpeg"),
      name: "Regular Fit Polo",
      price: "$1,100",
      discountPrice: "$572",
    },
    {
      id: "3",
      image: require("../../assets/images/R.jpeg"),
      name: "Regular Fit Black",
      price: "$1,690",
    },
    {
      id: "4",
      image: require("../../assets/images/R.jpeg"),
      name: "Regular Fit V-Neck",
      price: "$1,290",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);

    }
  };
  const handleSubmitSearch = () => {
    if (searchQuery.trim() !== "" && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches]);
    }
    Keyboard.dismiss();
  };
  const clearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== search));
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        {item.discountPrice && (
          <Text style={styles.discountPrice}>{item.discountPrice}</Text>
        )}
      </View>
      <Ionicons name="arrow-forward-outline" size={24} color="black" style={styles.arrowIcon} />
    </View>
  );
  

  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <View style={styles.recentSearchItem}>
      <Text style={styles.recentSearchText}>{item}</Text>
      <TouchableOpacity onPress={() => removeRecentSearch(item)}>
        <Ionicons name="close-outline" size={20} color="#777" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.searchTitle}>Search</Text>
        <TouchableOpacity onPress={() => navigation.navigate("notification")}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmitSearch}
        />
        <TouchableOpacity>
          <FontAwesome name="microphone" size={20} color="#777" />
        </TouchableOpacity>
      </View>

      {recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <View style={styles.recentSearchesHeader}>
            <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={clearAllRecentSearches}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearchItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productGrid}
      />
    </View>
  );
};

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
  searchTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "black",
  },
  recentSearchesContainer: {
    marginBottom: 20,
  },
  recentSearchesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },

  clearAllText: {
    fontSize: 14,
    color: "#8000FF",
  },
  recentSearchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  recentSearchText: {
    color: "black",
  },
  productGrid: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  card: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    padding: 10,
  },
  productImage: {
    width: 80, 
    height: 80, 
    resizeMode: "cover",
    borderRadius: 10, 
    marginRight: 10,
  },
  productDetails: {
    flex: 1, 
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  productPrice: {
    fontSize: 14,
    color: "#777",
  },
  discountPrice: {
    fontSize: 14,
    color: "red",
    textDecorationLine: "line-through",
  },
  arrowIcon: {
    alignSelf: "center", // Align the arrow to the right
    marginLeft: 10, // Add spacing between text and arrow
  },
});

