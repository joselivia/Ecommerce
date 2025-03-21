import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';

interface Props {
  navigation: NavigationProp<any>;
}
type Card = {
  id: string;
  type: string;
  number: string;
  default: boolean;
};

export default function PaymentMethodScreen({navigation}:Props) {
  const [cards, setCards] = useState<Card[]>([
   { id: '1', type: 'VISA', number: '**** **** **** 2512', default: true },
    { id: '2', type: 'MasterCard', number: '**** **** **** 5421', default: false },
    { id: '3', type: 'VISA', number: '**** **** **** 2512', default: false },
  ]);

  const [selectedCard, setSelectedCard] = useState('1'); 

  const handleCardSelect = (id: string) => {
    setSelectedCard(id);
  };

  const renderItem: ListRenderItem<Card> = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardType}>{item.type}</Text>
        <Text style={styles.cardNumber}>{item.number}</Text>
      </View>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            selectedCard === item.id ? styles.selectedRadioButton : null,
          ]}
          onPress={() => handleCardSelect(item.id)}
        >
          {selectedCard === item.id ? <View style={styles.innerCircle} /> : null}
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
        <Text style={styles.headerTitle}>Payment Method</Text>
        <TouchableOpacity onPress={() => navigation.navigate('notification')}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Saved Cards</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={()=>navigation.navigate("AddCard")} style={styles.addCardButton}>
        <Text style={styles.addCardText}>+ Add New Card</Text>
      </TouchableOpacity>

      <Button title="Apply" onPress={() => console.log('Apply selected card')} color="#6C5B7B" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardNumber: {
    fontSize: 14,
    color: '#777',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6C5B7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#9b6e9a',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9b6e9a',
  },
  addCardButton: {
     alignItems: 'center',
      padding: 10,
      borderColor:'#6C5B7B',
      borderWidth:1,
    borderRadius: 5,
    
  },
  addCardText: {
    color: 'blue',
    fontSize: 16,
  },
});
