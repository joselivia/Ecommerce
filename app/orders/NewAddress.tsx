import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps'; 
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationProp } from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<any>;
}
export default function NewAddressScreen({navigation}:Props) { 
  const [addressNickname, setAddressNickname] = useState('Home'); 
  const [fullAddress, setFullAddress] = useState(''); 
  const [isDefault, setIsDefault] = useState(false); 
 
  const handleAddAddress = () => { 
    console.log('Address Nickname:', addressNickname); 
    console.log('Full Address:', fullAddress); 
    console.log('Make Default:', isDefault); 
  }; 
 
  return ( 
    <ScrollView style={styles.container}> 
      <View style={styles.header}> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity> 
        <Text style={styles.headerTitle}>New Address</Text> 
      <TouchableOpacity onPress={() => navigation.navigate('notification')}>
                <Ionicons name="notifications-outline" size={24} color="black" />
              </TouchableOpacity>
      </View> 
 
      <View style={styles.mapContainer}> 
        <MapView 
          style={styles.map} 
          initialRegion={{ 
            latitude: 37.78825, 
            longitude: -122.4324, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421, 
          }} 
        > 
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} /> 
        </MapView> 
      </View> 

      <View style={styles.formContainer}> 
        <Text style={styles.label}>Address Nickname</Text> 
        <TextInput 
          style={styles.input} 
          value={addressNickname} 
          onChangeText={setAddressNickname} 
        /> 
 
        <Text style={styles.label}>Full Address</Text> 
        <TextInput 
          style={styles.input} 
          value={fullAddress} 
          onChangeText={setFullAddress} 
          placeholder="Enter full address" 
        /> 
 
        <View style={styles.switchContainer}> 
          <Text style={styles.switchLabel}>Make this as a default address</Text> 
          <Switch 
            value={isDefault} 
            onValueChange={setIsDefault} 
          /> 
        </View> 
         <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}> 
          <Text style={styles.addButtonText}>Add</Text> 
        </TouchableOpacity> 
      </View> 
    </ScrollView> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  }, 
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
  }, 
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
  }, 
  mapContainer: { 
    height: 200, 
    margin: 16, 
    borderRadius: 8, 
    overflow: 'hidden', 
  }, 
  map: { 
    flex: 1, 
  }, 
  formContainer: { 
    padding: 16, 
    backgroundColor: '#f9f9f9', 
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16, 
  }, 
  label: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 8, 
  }, 
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 16, 
    backgroundColor: '#fff', 
  }, 
  switchContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16, 
  }, 
  switchLabel: { 
    fontSize: 14, 
    color: '#555', 
  }, 
  addButton: { 
    backgroundColor: '#6A5AE0', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
  }, 
  addButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16, 
  }, 
});