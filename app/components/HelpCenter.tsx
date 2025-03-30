import { StyleSheet, Text, View,TouchableOpacity, ScrollView } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';  
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
interface Props {
  navigation: NavigationProp<any>;
}
export default function HelpCenterScreen ({navigation}:Props) { 
  return ( 
    <View style={styles.container}> 
      <ScrollView style={styles.content}> 
        <TouchableOpacity style={styles.contactOption} onPress={()=>{navigation.navigate("Customerservice")}}> 
          <Ionicons name="headset-outline" size={24} color="black" /> 
          <Text style={styles.contactOptionText}>Customer Service</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.contactOption}> 
          <Ionicons name="logo-whatsapp" size={24} color="black" /> 
          <Text style={styles.contactOptionText}>Whatsapp</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.contactOption}> 
          <Ionicons name="globe-outline" size={24} color="black" /> 
          <Text style={styles.contactOptionText}>Website</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.contactOption}> 
          <Ionicons name="logo-facebook" size={24} color="black" /> 
          <Text style={styles.contactOptionText}>Facebook</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.contactOption}> 
          <Ionicons name="logo-twitter" size={24} color="black" /> 
          <Text style={styles.contactOptionText}>Twitter</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.contactOption}> 
          <Ionicons name="logo-instagram" size={24} color="black" /> 
          <Text style={styles.contactOptionText}>Instagram</Text> 
        </TouchableOpacity> 
      </ScrollView> 
          </View> 
  ); 
}; 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  }, 

  backButton: { 
    marginLeft: -10, 
  }, 
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
  }, 
  content: { 
    paddingHorizontal: 20, 
  }, 
  contactOption: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
  }, 
  contactOptionText: { 
    marginLeft: 10, 
  }, 
  
}); 
 