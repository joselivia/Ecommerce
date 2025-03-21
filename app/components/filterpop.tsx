import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

interface FilterPopupProps {
  onClose: (filters: { sort: string; price: number; size: string }) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [selectedTab, setSelectedTab] = useState<string>("Relevance");
  const [priceRange, setPriceRange] = useState<number>(0);
  const [size, setSize] = useState<string>("L");

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose({ sort: selectedTab, price: priceRange, size }));
  };

  return (
    <TouchableWithoutFeedback onPress={slideDown}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Filters</Text>
            <TouchableOpacity onPress={slideDown}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />
          <Text style={styles.boldText}>Sort By</Text>
          <View style={styles.tabsContainer}>
            {["Relevance", "Price: Low - High", "Price: High - Low"].map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tab, selectedTab === tab && styles.activeTab]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.boldText}>Price</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>$0</Text>
            <Slider
              style={{ width: "100%" }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
              minimumTrackTintColor="#9B6EF3"
              maximumTrackTintColor="#000"
              thumbTintColor="#9B6EF3"
            />
            <Text style={styles.priceText}>${priceRange}</Text>
          </View>

          <Text style={styles.boldText}>Size</Text>
          <View style={styles.tabsContainer}>
            {["S", "M", "L", "XL"].map((sz, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tab, size === sz && styles.activeTab]}
                onPress={() => setSize(sz)}
              >
                <Text style={[styles.tabText, size === sz && styles.activeTabText]}>
                  {sz}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={slideDown}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hr: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeTab: {
    backgroundColor: "#9B6EF3",
    borderColor: "#9B6EF3",
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: "white",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: "#9B6EF3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterPopup;
