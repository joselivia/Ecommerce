import React, { useState } from 'react'; 
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'; 
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { ImageSourcePropType } from 'react-native'; 
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
interface CartItem {
  id: number;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image: ImageSourcePropType; 
}

const CartScreen=({navigation}:Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, title: 'Regular Fit Slogan', size: 'L', price: 1190, quantity: 2, image: require('../../assets/images/icon.png') },
    { id: 2, title: 'Regular Fit Polo', size: 'M', price: 1100, quantity: 1, image: require('../../assets/images/icon.png') },
    { id: 3, title: 'Regular Fit Black', size: 'L', price: 1290, quantity: 1, image: require('../../assets/images/icon.png') },
  ]);

  const handleQuantityChange = (id: number, action: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }
        return item;
      })
    );
  };
  const handleDeleteItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = 80;
    const total = subTotal + shippingFee;
    return { subTotal, shippingFee, total };
  };
  const { subTotal, shippingFee, total } = calculateTotal();
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSize}>Size {item.size}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, 'decrement')}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, 'increment')}>
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
   <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      <TouchableOpacity onPress={() => navigation.navigate("notification")}>
                     <Ionicons name="notifications-outline" size={24} color="black" />
                   </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

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
          <Text style={styles.summaryText}>${shippingFee}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>${total}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("Checkout")}>
        <Text style={styles.checkoutButtonText}>Go To Checkout</Text>
        <AntDesign name="arrowright" size={20} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
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
    fontWeight: 'bold',
  },
  itemSize: {
    fontSize: 12,
    color: '#777',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemActions: {
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  summarySection: {
    marginVertical: 24,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#555',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#6A5AE0',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 8,

  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
 
});

export default CartScreen;
