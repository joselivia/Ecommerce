import React, { useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export default function CheckoutScreen({ navigation }: Props) {
  const [selectedPayment, setSelectedPayment] = useState('Card');
  const [showModal, setShowModal] = useState(false);

  const handlePlaceOrder = () => {
    setShowModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CheckOut</Text>
        <TouchableOpacity onPress={() => navigation.navigate('notification')}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.addressText}>Home</Text>
        <View style={styles.address}>
               <Ionicons name="location-outline" size={20} color="gray" style={{ marginRight: 8 }} />
               
        <Text style={styles.addressDetails}>925 S Chugach St #APT 10, Alaska 99645</Text>
             </View>
       </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === 'Card' && styles.selectedOption,
            ]}
            onPress={() => setSelectedPayment('Card')}
          >
            <Ionicons name="card-outline" size={20} color={selectedPayment === 'Card' ? '#fff' : '#000'} />
            <Text style={[styles.paymentText, selectedPayment !== 'Card' && { color: '#000' }]}> Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === 'Cash' && styles.selectedOption,
            ]}
            onPress={() => setSelectedPayment('Cash')}
          >
            <Ionicons name="cash-outline" size={20} color={selectedPayment === 'Cash' ? '#fff' : '#000'} />
            <Text style={[styles.paymentText, selectedPayment !== 'Cash' && { color: '#000' }]}> Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === 'Apple Pay' && styles.selectedOption,
            ]}
            onPress={() => setSelectedPayment('Apple Pay')}
          >
            <Ionicons name="logo-apple" size={20} color={selectedPayment === 'Apple Pay' ? '#fff' : '#000'} />
            <Text style={[styles.paymentText, selectedPayment !== 'Apple Pay' && { color: '#000' }]}> Apple Pay</Text>
          </TouchableOpacity>
        </View>
        {selectedPayment === 'Card' && (
          <View style={styles.cardDetails}>
            <Text style={styles.cardText}>VISA ** ** **** 2512</Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.summaryText}>Sub-total</Text>
          <Text style={styles.summaryText}>$ 5,870</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.summaryText}>VAT (%)</Text>
          <Text style={styles.summaryText}>$ 0.00</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.summaryText}>Shipping fee</Text>
          <Text style={styles.summaryText}>$ 80</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>$ 5,950</Text>
        </View>
      </View>

      <View style={styles.promoSection}>
        <Ionicons name="pricetag-outline" size={20} color="gray"  />
        <TextInput style={styles.promoInput} placeholder="Enter promo code" />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#6A5AE0" />
            <Text style={styles.modalText}>Congratulations!</Text>
            <Text style={styles.modalSubText}>Your order has been placed successfully.</Text>
            <TouchableOpacity
              style={styles.takeOrderButton}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('NewAddress');
              }}
            >
              <Text style={styles.takeOrderText}>Take Your Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

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
  section: {
    marginBottom: 24,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addressDetails: {
    fontSize: 14,
    color: '#555',
  },
  paymentOptions: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  selectedOption: {
    backgroundColor: '#6A5AE0',
  },
  paymentText: {
    marginLeft: 8,
    color: '#fff',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
  },
  summaryText: {
    fontSize: 14,
    color: '#555',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#6A5AE0',
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
  },
  placeOrderButton: {
    backgroundColor: '#6A5AE0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  modalSubText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  takeOrderButton: {
    backgroundColor: '#6A5AE0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  takeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
