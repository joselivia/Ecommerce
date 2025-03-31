import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList, Product } from "../../lib/types";

interface Board {
  id: string;
  title: string;
  items: Product[];
}

interface Props {
  navigation: NavigationProp<RootStackParamList, "wishlist">;
  route: RouteProp<RootStackParamList, "wishlist">;
}

export default function SavedBoardsScreen({ navigation, route }: Props) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const wishlistItems = route.params?.wishlist || [];

  useEffect(() => {
    if (wishlistItems.length > 0 && boards.length === 0) {
      console.log("Auto-creating default board with wishlist items");
      const defaultBoard: Board = {
        id: "default-" + Math.random().toString(),
        title: "Default Wishlist",
        items: wishlistItems,
      };
      setBoards([defaultBoard]);
      setSelectedBoard(defaultBoard.id);
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (wishlistItems.length > 0 && boards.length > 0 && selectedBoard) {
      console.log("useEffect triggered: Adding wishlist items to selected board");
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === selectedBoard
            ? { ...board, items: [...new Set([...board.items, ...wishlistItems])] }
            : board
        )
      );
    }
  }, [wishlistItems, selectedBoard]);

  const createBoard = () => {
    if (newBoardName.trim()) {
      const newBoard: Board = {
        id: Math.random().toString(),
        title: newBoardName,
        items: wishlistItems.length > 0 ? wishlistItems : [],
      };
      console.log("Creating new board:", newBoard);
      setBoards([...boards, newBoard]);
      setNewBoardName("");
      setModalVisible(false);
      if (wishlistItems.length > 0) {
        setSelectedBoard(newBoard.id);
      }
    }
  };

  const addToBoard = (boardId: string) => {
    if (wishlistItems.length > 0) {
      console.log("Adding to board:", boardId);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId
            ? { ...board, items: [...new Set([...board.items, ...wishlistItems])] }
            : board
        )
      );
      setSelectedBoard(boardId);
    }
  };

  const renderBoardItem = ({ item }: { item: Board }) => {
    const previewImages = item.items.slice(0, 4);
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setSelectedBoard(item.id)}>
          <View style={styles.imagesContainer}>
            {previewImages.map((product) => (
              <Image
                key={product.$id}
                source={{
                  uri:
                    Array.isArray(product.images) && product.images.length > 0
                      ? product.images[0]
                      : typeof product.images === "string"
                      ? product.images
                      : "https://via.placeholder.com/70",
                }}
                style={styles.boardImage}
              />
            ))}
          </View>
          <View style={styles.boardInfo}>
            <Text style={styles.boardTitle}>{item.title}</Text>
            <Text style={styles.itemCount}>{item.items.length} items</Text>
            <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => addToBoard(item.id)}>
            <Icon name="plus" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="share-variant" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="dots-horizontal" size={22} color="black" />
          </TouchableOpacity>
        </View>
          </View>
        </TouchableOpacity>
   
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createBoardButton}
        onPress={() => {
          console.log("Create board button pressed");
          setModalVisible(true);
        }}
      >
        <Icon name="plus" size={24} color="black" />
        <Text style={styles.createBoardText}>Create a new board</Text>
      </TouchableOpacity>

      {boards.length === 0 ? (
        <Text style={styles.emptyText}>You have no boards yet.</Text>
      ) : (
        <FlatList
          data={boards}
          keyExtractor={(item) => item.id}
          renderItem={renderBoardItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

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
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  createBoardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#e0e0e0", 
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1, 
    borderColor: "#ccc",
  },
  createBoardText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
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
  boardInfo: {
    marginTop: 8,
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemCount: {
    color: "gray",
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
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
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});