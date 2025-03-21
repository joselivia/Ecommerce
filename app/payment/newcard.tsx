import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'; 
interface Props {
  navigation: NavigationProp<any>;
}
export default function NewCardScreen ({navigation}:Props) {
    const [cardNumber, setCardNumber] = useState(''); 
  const [expiryDate, setExpiryDate] = useState(''); 
  const [securityCode, setSecurityCode] = useState(''); 
 
  const handleAddCard = () => { 
    console.log("Card added:", { cardNumber, expiryDate, securityCode }); 
  }; 
 
  return ( 
      <View style={styles.contained}>
    <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>New Card</Text>
    <TouchableOpacity onPress={() => navigation.navigate('notification')}>
      <Ionicons name="notifications-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container} 
    > 
     
      <View style={styles.form}> 
        <Text style={styles.label}>Card Number</Text> 
        <TextInput 
          style={styles.input} 
          value={cardNumber} 
          onChangeText={setCardNumber} 
          placeholder="**** ** ** 2512" 
          keyboardType="numeric" 
        /> 
        <View style={styles.row}> 
          <View style={styles.inputContainer}> 
            <Text style={styles.label}>Expiry Date</Text> 
            <TextInput 
              style={styles.input} 
              value={expiryDate} 
              onChangeText={setExpiryDate} 
              placeholder="MM/YY" 
              keyboardType="numeric" 
            /> 
          </View> 
          <View style={styles.inputContainer}> 
            <Text style={styles.label}>Security Code</Text> 
            <TextInput 
              style={styles.input} 
              value={securityCode} 
              onChangeText={setSecurityCode} 
              placeholder="345" 
              keyboardType="numeric" 
            /> 
          </View> 
        </View> 
        <Button title="Add Card" onPress={handleAddCard} color="#6C5B7B" /> 
      </View> 
    </KeyboardAvoidingView> 
    </View>
  ); 
}; 
 
const styles = StyleSheet.create({ 
  contained: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
   
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
  form: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 5, 
  }, 
  label: { 
    fontSize: 16, 
    marginBottom: 5, 
    color: '#333', 
  }, 
  input: { 
    height: 40, 
    borderColor: '#ddd', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingLeft: 10, 
    marginBottom: 15, 
    fontSize: 16, 
  }, 
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15, 
  }, 
  inputContainer: { 
    flex: 1, 
    marginRight: 10, 
  }, 
}); 
