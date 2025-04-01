import React from "react"; // Removed useEffect since it’s not needed now
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useCart } from "../components/CartContext";
import { formatPrice } from "@/lib/types";

interface CartItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  navigation: NavigationProp<any>;
}

const CartScreen = ({ navigation }: Props) => {
  const { cart, setCart } = useCart();

  const handleQuantityChange = (id: string, action: string) => {
    setCart((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) => {
        if (item.id === id) {
          const newQuantity = action === "increment" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setCart((prevItems: CartItem[]) =>
      prevItems.filter((item: CartItem) => item.id !== id)
    );
  };

  const calculateTotal = () => {
    const subTotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const shippingFee = 80;
    const total = subTotal + shippingFee;
    return { subTotal, shippingFee, total };
  };

  const { subTotal, shippingFee, total } = calculateTotal();

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/60" }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title || "Unnamed Item"}</Text>
        <Text style={styles.itemSize}>Size {item.size || "N/A"}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price) || 0}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, "decrement")}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, "increment")}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
         <View style={styles.header}>
              <Text style={styles.title}>Cart</Text>
            </View>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.summarySection}>
        <View style={styles.rowBetween}>
          <Text style={styles.summaryText}>Sub-total</Text>
          <Text style={styles.summaryText}>${subTotal}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.summaryText}>VAT (%)</Text>
          <Text style={styles.summaryText}>$0.00</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.summaryText}>Shipping fee</Text>
          <Text style={styles.summaryText}>{formatPrice(shippingFee)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>{formatPrice(total)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={styles.checkoutButtonText}>Make Order</Text>
        <AntDesign name="arrowright" size={20} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemSize: {
    fontSize: 12,
    color: "#777",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  itemActions: {
    alignItems: "center",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  summarySection: {
    marginVertical: 24,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#555",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#6A5AE0",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default CartScreen;