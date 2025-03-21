import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CountryPicker,{CountryCode} from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserInfo() {
  const [countryCode, setCountryCode] = useState<CountryCode>('US'); 
  const [callingCode, setCallingCode] = useState('+1');
  const [address, setAddress] = useState('123 Main Street, New York, NY, USA');

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        My Details
      </Text>
      <Text style={styles.label}>Full Name</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Cody Fisher</Text>
      </View>
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>cody.fisher45@example</Text>
      </View>
      <Text style={styles.label}>Date of Birth</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>12/07/1990</Text>
      </View>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Male</Text>
      </View>

       <Text style={styles.label}>Phone Number</Text>
      <View style={styles.phoneContainer}>
      <TouchableWithoutFeedback disabled={true}>
  <CountryPicker
    withFlag
    withCallingCode
    withEmoji
    countryCode={countryCode}
    containerButtonStyle={styles.countryPicker}
  />
</TouchableWithoutFeedback>
        <Text style={styles.callingCode}>{callingCode}</Text>
        <Text style={styles.infoText}>234 453 231 506</Text>
      </View>
      <Text style={styles.label}>Address</Text>
      <View style={styles.addressCard}>
        <Icon name="location-outline" size={24} color="#666" />
        <Text style={styles.addressText}>{address}</Text>
      </View>
    </View>
  );
}

const styles =StyleSheet.create ({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5
  },
  infoBox: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  infoText: {
    fontSize: 16,
    color: '#333'
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  countryPicker: {
    marginRight: 10
  },
  callingCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10
  },
  addressText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333'
  }
});
