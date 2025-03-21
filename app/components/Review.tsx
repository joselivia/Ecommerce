import React, { useState } from 'react'; 
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ProgressBar from 'react-native-progress/Bar';  
type Review = {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
};
const ReviewsScreen = () => { 
  const [reviews, setReviews] = useState<Review[]>([ 
    { 
      id: 1, 
      rating: 5, 
      text: 'The item is very good, my son likes it very much and plays every day.', 
      author: 'Wade Warren', 
      date: '6 days ago', 
    }, 
    { 
      id: 2, 
      rating: 5, 
      text: 'The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!', 
      author: 'Guy Hawkins', 
      date: '1 week ago', 
    }, 
    { 
      id: 3, 
      rating: 5, 
      text: 'I just bought it and the stuff is really good! I highly recommend it!', 
      author: 'Robert Fox', 
      date: '2 weeks ago', 
    }, 
  ]); 
 
  const [selectedSort, setSelectedSort] = useState('Most Relevant'); 
 
  const renderReview =  ({ item }: { item: Review })=> ( 
    <View style={styles.reviewContainer}> 
      <View style={styles.ratingContainer}> 
        {[...Array(item.rating)].map((_, i) => ( 
          <MaterialCommunityIcons key={i} name="star" size={20} color="gold" /> 
        ))} 
        {[...Array(5 - item.rating)].map((_, i) => ( 
          <MaterialCommunityIcons key={i} name="star-outline" size={20} color="gold" /> 
        ))} 
      </View> 
      <Text style={styles.reviewText}>{item.text}</Text> 
      <View style={styles.authorContainer}> 
        <Text style={styles.author}>{item.author}</Text> 
        <Text style={styles.date}>{item.date}</Text> 
      </View> 
    </View> 
  ); 
 
  const renderStarBar = () => { 
    const ratings = [5, 4, 3, 2, 1]; 
    const mockRatingDistribution = [400, 300, 150, 100, 50];  
 const totalRatings = mockRatingDistribution.reduce((a, b) => a + b, 0); 
    return ( 
      <View style={styles.starBarContainer}> 
        {ratings.map((rating, index) => ( 
          <View key={rating} style={styles.starBarRow}> 
            <Text style={styles.starBarRating}>{rating}</Text> 
            <MaterialCommunityIcons name="star" size={20} color="gold" /> 
            <ProgressBar 
              progress={mockRatingDistribution[index] / totalRatings} 
            width={null} 
              style={styles.starBarProgress} 
               color="gold" 
              borderWidth={0}  
         unfilledColor="#e0e0e0" 
            /> 
          </View> 
        ))} 
      </View> 
    ); 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <View style={styles.header}> 
        <Ionicons name="arrow-back" size={24} color="black" /> 
        <Text style={styles.headerTitle}>Reviews</Text> 
      </View> 
      <View style={styles.ratingSummary}> 
        <Text style={styles.rating}>4.0</Text> 
        <View style={styles.starContainer}> 
          <MaterialCommunityIcons name="star" size={20} color="gold" /> 
          <MaterialCommunityIcons name="star" size={20} color="gold" /> 
          <MaterialCommunityIcons name="star" size={20} color="gold" /> 
          <MaterialCommunityIcons name="star" size={20} color="gold" /> 
          <MaterialCommunityIcons name="star-half-full" size={20} color="gold" /> 
        </View> 
        <Text style={styles.ratingCount}>1034 Ratings</Text> 
      </View> 
      {renderStarBar()} 
      <View style={styles.reviewCountContainer}> 
        <Text style={styles.reviewCount}>45 Reviews</Text> 
        <TouchableOpacity style={styles.sortButton}> 
          <Text style={styles.sortButtonText}>{selectedSort}</Text> 
          <Ionicons name="chevron-down" size={16} color="black" /> 
        </TouchableOpacity> 
      </View> 
      <FlatList 
        data={reviews} 
        renderItem={renderReview} 
        keyExtractor={(item) => item.id.toString()} 
      /> 
    </View> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  }, 
  header: { 
    flexDirection: 'row',alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
  }, 
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 10, 
  }, 
  ratingSummary: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
  }, 
  rating: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginRight: 10, 
  }, 
  starContainer: { 
    flexDirection: 'row', 
  }, 
  ratingCount: { 
    marginLeft: 10, 
  }, 
  reviewCountContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 10, 
  }, 
  reviewCount: { 
    fontSize: 16, 
  }, 
  sortButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  sortButtonText: { 
    fontSize: 16, 
    marginRight: 5, 
  }, 
  reviewContainer: { 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
  }, 
  ratingContainer: { 
    flexDirection: 'row', 
    marginBottom: 5, 
  }, 
  reviewText: { 
    marginBottom: 5, 
  }, 
  authorContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  author: { 
    fontWeight: 'bold', 
  }, 
  date: { 
    color: 'gray', 
    marginLeft: 5, 
  }, 
  starBarContainer: { 
    paddingHorizontal: 20, 
    marginBottom: 10, 
  }, 
  starBarRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5, 
  }, 
  starBarRating: { 
    marginRight: 5, 
  }, 
  starBarProgress: { 
    flex: 1, 
    
  }, 
}); 
 
export default ReviewsScreen;