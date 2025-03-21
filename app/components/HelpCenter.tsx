import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';  
import { NavigationProp } from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<any>;
}
export default function HelpCenterScreen ({navigation}:Props) { 
  return ( 
    <View style={styles.container}> 
      <View style={styles.header}> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text> 
      </View> 
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
      <View style={styles.bottomNavigation}> 
        <TouchableOpacity style={styles.bottomNavItem}> 
          <Ionicons name="home" size={24} color="black" /> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.bottomNavItem}> 
          <Ionicons name="search" size={24} color="black" /> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.bottomNavItem}> 
          <Ionicons name="heart" size={24} color="black" /> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.bottomNavItem}> 
          <Ionicons name="cart" size={24} color="black" /> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.bottomNavItem}> 
          <Ionicons name="person" size={24} color="black" /> 
        </TouchableOpacity> 
      </View> 
    </View> 
  ); 
}; 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  }, 
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
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
  bottomNavigation: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#ccc', 
    paddingVertical: 10, 
  }, 
  bottomNavItem: { 
    alignItems: 'center', 
  }, 
 
}); 
 