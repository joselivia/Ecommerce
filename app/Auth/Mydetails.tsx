import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker,{CountryCode} from 'react-native-country-picker-modal';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
interface Props {
    navigation: NavigationProp<any>;
}
export default function MyDetails({navigation}:Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [gender, setGender] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US'); 
  const [callingCode, setCallingCode] = useState('+1');
  const [phone, setPhone] = useState('');

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
       <View style={styles.header}>
             <TouchableOpacity onPress={() => navigation.goBack()}>
               <Ionicons name="arrow-back-outline" size={24} color="black" />
             </TouchableOpacity>
             <Text style={styles.Title}>My Details</Text>
             <TouchableOpacity onPress={() => navigation.navigate("notification")}>
               <Ionicons name="notifications-outline" size={24} color="black" />
             </TouchableOpacity>
           </View>

      <Text style={{ marginBottom: 5 }}>Full Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={{ marginBottom: 5, marginTop: 15 }}>Email Address</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

      <Text style={{ marginBottom: 5, marginTop: 15 }}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={{ marginBottom: 5, marginTop: 15 }}>Gender</Text>
      <View style={styles.picker}>
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={{ marginBottom: 5, marginTop: 15 }}>Phone Number</Text>
      <View style={styles.phoneContainer}>
      <CountryPicker
  withFilter
  withFlag
  withCallingCode
  withEmoji
  countryCode={countryCode || 'US'}
  onSelect={(country) => {
    setCountryCode(country.cca2 || 'US');
    setCallingCode(`+${country.callingCode?.[0] || '1'}`);
  }}
  containerButtonStyle={styles.countryPicker}
/>

        <TextInput value={callingCode} editable={false} style={styles.callingCode} />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.phoneInput}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
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
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9'
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#f9f9f9'
  },
  countryPicker: {
    marginRight: 10
  },
  callingCode: {
    fontSize: 16,
    padding: 10
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    padding: 10
  },
  button: {
    backgroundColor: '#9B6EF3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
