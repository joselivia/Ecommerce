import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    navigation: NavigationProp<any>;
    route: RouteProp<{ wishlist: {wishlist: any[] }}, 'wishlist'>;
}

interface Board {
  id: string;
  title: string;
items: any[];
}

export default function SavedBoardsScreen({navigation, route}:Props) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const wishlistItems = route.params?.wishlist || [];


  const createBoard = () => {
    if (newBoardName.trim()) {
      const newBoard: Board = {
        id: Math.random().toString(),
        title: newBoardName,
        items: [],
      };
      setBoards([...boards, newBoard]);
      setNewBoardName("");
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createBoardButton} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={24} color="black" />
        <Text style={styles.createBoardText}>Create a new board</Text>
      </TouchableOpacity>

{ boards.length === 0 ? (
  <Text style={styles.emptyText}>You have no boards yet.</Text>
) : (
  <FlatList
  data={boards}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.card}>
       <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedBoard(item.id)}
            >
              <Text style={styles.boardTitle}>{item.title}</Text>
              <Text style={styles.itemCount}>{item.items.length} items</Text>
            </TouchableOpacity>
                 <View style={styles.boardInfo}>
              <Text style={styles.boardTitle}>{item.title}</Text>
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
      />)}
    <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Collection</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter board name"
              value={newBoardName}
              onChangeText={setNewBoardName}
            />
            <TouchableOpacity style={styles.createButton} onPress={createBoard}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  emptyText: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 20 },
  productImage: { width: 70, height: 80, borderRadius: 8 },
  infoContainer: { marginLeft: 10 },
  productName: { fontSize: 16, fontWeight: "bold" },
  discountPrice: { fontSize: 16, fontWeight: "bold", color: "#8000FF" },
  originalPrice: { fontSize: 14, textDecorationLine: "line-through", color: "#777" },

  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", 
  },
  boardImage: {
    width: 70,
    height: 80,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5, 
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: "#8000FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: { color: "white", fontWeight: "bold" },
});
