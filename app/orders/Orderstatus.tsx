import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useRef, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated, TouchableWithoutFeedback, Button, TextInput } from 'react-native'; 

const completedOrders = [ 
  { id: '1', name: 'Regular Fit Slogan', size: 'M', price: '$1,190', image: require('../../assets/images/icon.png')}, 
  { id: '2', name: 'Regular Fit Polo', size: 'L', price: '$1,100',  image: require('../../assets/images/icon.png')}, 
  { id: '3', name: 'Regular Fit Black', size: 'L', price: '$1,690', image: require('../../assets/images/icon.png')},  
  { id: '4', name: 'Regular Fit V-Neck', size: 'S', price: '$1,290', image: require('../../assets/images/icon.png')}, 
  { id: '5', name: 'Regular Fit Pink', size: 'M', price: '$1,341',  image: require('../../assets/images/icon.png')},  
]; 

interface Props {
     navigation: NavigationProp<any>;
}

export default function OrderStatusScreen ({ navigation }: Props){ 
  const [visible, setVisible] = useState<boolean>(false); 
  const [rating, setRating] = useState<number>(0); 
  const [review, setReview] = useState<string>(''); 
  const slideAnim = useRef(new Animated.Value(0)).current; 

  const slideUp = () => { 
      setVisible(true); 
      Animated.timing(slideAnim, { 
          toValue: 1, 
          duration: 300, 
          useNativeDriver: true, 
      }).start(); 
  }; 

  const slideDown = () => { 
      Animated.timing(slideAnim, { 
          toValue: 0, 
          duration: 300, 
          useNativeDriver: true, 
      }).start(() => setVisible(false)); 
  }; 

  const translateY = slideAnim.interpolate({ 
      inputRange: [0, 1], 
      outputRange: [300, 0], 
  }); 

  const handleStarPress = (star: number) => { 
      setRating(star); 
  }; 
  
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
            <FlatList 
          data={completedOrders} 
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => item ? ( 
            <View style={styles.orderItem}> 
              <Image source={item.image} style={styles.image} /> 
              <View style={styles.orderDetails}> 
               <View> 
                <Text>{item.name} - {item.size}</Text> 
                <Text>{item.price}</Text> 
               </View> 
                <View style={styles.statusReview}> 
                <Text style={styles.completedLabel}>Completed</Text> 
                <TouchableOpacity style={styles.reviewButton} onPress={slideUp} > 
                  <Text style={styles.reviewButtonText}>Leave Review</Text> 
                </TouchableOpacity> 
                </View> 
              </View> 
            </View> 
          ) : null} 
        /> 

{visible && ( 
        <TouchableWithoutFeedback onPress={slideDown}> 
          <View style={styles.overlay}> 
            <Animated.View style={[styles.card, { transform: [{ translateY }] }]}> 
              <View style={styles.cardHeader}> 
                 <Text style={styles.cardTitle}>Leave a Review</Text> 
                <TouchableWithoutFeedback onPress={slideDown}> 
                  <Ionicons name="close" size={24} color="black" /> 
                </TouchableWithoutFeedback> 
              </View> 
              <View style={styles.hr} /> 
              <Text style={styles.boldText}>How was your order?</Text> 
              <Text style={styles.subText}>Please give your rating and also a review</Text> 
              <View style={styles.ratingContainer}> 
                {[...Array(5)].map((_, i) => ( 
                  <TouchableWithoutFeedback key={i} onPress={() => handleStarPress(i + 1)}> 
                    <MaterialCommunityIcons 
                      name={i < rating ? "star" : "star-outline"} 
                      size={30} 
                      color="gold" 
                    /> 
                  </TouchableWithoutFeedback> 
                ))} 
              </View> 
              <TextInput 
                style={styles.textarea} 
                multiline 
                numberOfLines={4} 
                placeholder="Leave your review here" 
                onChangeText={setReview} 
                value={review} 
              /> 
              <Button title="Submit" onPress={slideDown} /> 
            </Animated.View> 
          </View> 
        </TouchableWithoutFeedback> 
      )} 


      </View> 
    ); 
};

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    padding: 16, 
  }, 
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
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
    marginBottom: 15, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 5, 
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  image: { 
    width: 50,  
    height: 50, 
    marginRight: 10,  
    borderRadius: 5,  
  }, 
  orderDetails: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  }, 
  completedLabel: { 
    color: 'green', 
    fontWeight: 'bold', 
  }, 
  reviewButton: { 
    backgroundColor: '#f0f0f0', 
    padding: 5, 
    borderRadius: 5, 
  }, 
  reviewButtonText: { 
    color: '#007BFF', 
  }, 
  statusReview: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 10, 
  } ,
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end', 
  }, 
  card: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 20, 
    alignItems: 'center', 
  }, 
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
  }, 
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
     
  }, 
  hr: { 
    borderBottomColor: 'gray', 
    borderBottomWidth: 1, 
    width: '100%', 
    marginVertical: 10, 
  }, 
  boldText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10, 
  }, 
  subText: { 
    fontSize: 14, 
    color: 'gray', 
    marginBottom: 20, 
  }, 
  ratingContainer: { 
    flexDirection: 'row', 
    marginBottom: 20, 
  }, 
  textarea: { 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    padding: 10, 
    textAlignVertical: 'top', 
    width: '100%', 
    marginBottom: 20, 
  }, 

}); 
