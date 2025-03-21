import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Board {
  id: string;
  title: string;
  itemCount: number;
  images: any[];
}

const boards: Board[] = [
  {
    id: "1",
    title: "Levi's Jeans",
    itemCount: 10,
    images: [
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
    ],
  },
  {
    id: "2",
    title: "Adidas Sneakers",
    itemCount: 6,
    images: [
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
    ],
  },
  {
    id: "3",
    title: "earings",
    itemCount: 6,
    images: [
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
      require("../../assets/images/icon.png"),
    ],
  },
];

export default function SavedBoardsScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createBoardButton}>
        <Icon name="plus" size={24} color="black" />
        <Text style={styles.createBoardText}>Create a new board</Text>
      </TouchableOpacity>

      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.boardCard}>
            {/* Display only the first 4 images */}
            <View style={styles.imagesContainer}>
              {item.images.slice(0, 4).map((image, index) => (
                <Image key={index} source={image} style={styles.boardImage} />
              ))}
            </View>

            {/* Collection Name + Item Count */}
            <View style={styles.boardInfo}>
              <Text style={styles.boardTitle}>{item.title}</Text>
              <Text style={styles.itemCount}>{item.itemCount} items</Text>

              {/* Icons */}
              <View style={styles.iconsContainer}>
                <TouchableOpacity>
                  <Icon name="share-variant" size={22} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="dots-horizontal" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  createBoardButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    marginBottom: 10,
  },
  createBoardText: { fontSize: 16, marginLeft: 10, fontWeight: "bold" },
  boardCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap images in rows
  },
  boardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5, // Ensures spacing in case of wrapping
  },
  boardInfo: { marginTop: 8 },
  boardTitle: { fontSize: 16, fontWeight: "bold" },
  itemCount: { color: "gray" },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    gap: 10,
  },
});
