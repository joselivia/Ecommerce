import { Ionicons } from '@expo/vector-icons'; 
import { NavigationProp } from '@react-navigation/native'; 
import React, { useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'; 
 
interface Props { 
  navigation: NavigationProp<any>; 
} 
 
type Order = { 
  id: string; 
  title: string; 
  size: string; 
  status: string; 
  price: string; 
  image: any; 
}; 
 
export default function MyOrdersScreen({ navigation }: Props) { 
  const [isOngoing, setIsOngoing] = useState(true); 
 
  const orders = [ 
    { id: '1', title: 'Regular Fit Slogan', size: 'Size M', status: 'In Transit', price: '$1,190', image: { uri: 'https://reactnative.dev/img/tiny_logo.png' } }, 
    { id: '2', title: 'Regular Fit Polo', size: 'Size L', status: 'Picked', price: '$1,100', image: { uri: 'https://reactnative.dev/img/tiny_logo.png' } }, 
    { id: '3', title: 'Regular Fit Black', size: 'Size L', status: 'In Transit', price: '$1,690', image: { uri: 'https://reactnative.dev/img/tiny_logo.png' } }, 
    { id: '4', title: 'Regular Fit V-Neck', size: 'Size S', status: 'Packing', price: '$1,290', image: { uri: 'https://reactnative.dev/img/tiny_logo.png' } }, 
    { id: '5', title: 'Regular Fit Pink', size: 'Size M', status: 'In Transit', price: '$1,341', image: { uri: 'https://reactnative.dev/img/tiny_logo.png' } }, 
  ]; 
 
  const completedOrders = orders.filter(order => order.status === "Completed");
  const ongoingOrders = orders.filter(order => order.status !== "Completed");

  const renderItem = ({ item }: { item: Order }) => ( 
    <View style={styles.orderItem}> 
      <Image source={item.image} style={styles.orderImage} /> 
      <View style={styles.orderDetails}> 
        <Text style={styles.orderTitle}>{item.title}</Text> 
        <Text style={styles.orderSize}>{item.size}</Text> 
        <Text style={styles.orderPrice}>{item.price}</Text> 
        <View style={styles.stausbtn}> 
        <Text style={styles.orderStatus}>{item.status}</Text> 
               </View> 
      </View> 
    </View> 
  ); 
 
  return ( 
    <View style={styles.container}> 
      <View style={styles.header}> 
        <TouchableOpacity onPress={() => navigation.goBack()}> 
          <Ionicons name="arrow-back-outline" size={24} color="black" /> 
        </TouchableOpacity> 
        <Text style={styles.Title}>My Orders</Text> 
        <TouchableOpacity onPress={() => navigation.navigate("notification")}> 
          <Ionicons name="notifications-outline" size={24} color="black" /> 
        </TouchableOpacity> 
      </View> 
      <FlatList data={isOngoing ? ongoingOrders : completedOrders} keyExtractor={item => item.id} renderItem={renderItem} />
    
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
  }, 
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 20, 
  }, 
  Title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "black", 
  }, 
   orderItem: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    paddingBottom: 15, 
    paddingTop: 15, 
  }, 
  orderImage: { 
    width: 60, 
    height: 60, 
    marginRight: 15, 
    borderRadius: 5, 
  }, 
  orderDetails: { 
    flex: 1, 
  }, 
  orderTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
  }, 
  orderSize: { 
    fontSize: 14, 
    color: '#777', 
  }, 
  
  orderPrice: { 
    fontSize: 14, 
    color: '#333', 
    marginTop: 5, 
  }, 
  stausbtn:{ 
    position:'absolute', 
right:0, 
top:0, 
    
  }, 
   orderStatus: { 
    fontSize: 14, 
    color: '#777', 
  marginBottom: 5, 
    textAlign: 'right', 
  }, 
});