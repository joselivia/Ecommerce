import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  navigation: NavigationProp<any>;
}
export default function Index({ navigation }: Props) {
  return (
    <View style={styles.container}> 
      <Image 
        source={require('../assets/images/R.jpeg')} 
        style={styles.logo} 
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("tabs")}>
        <Text style={styles.buttonText}>Get Started</Text>
        <AntDesign name="arrowright" size={20} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  button: {
 position: 'absolute',
 bottom: 20,
 flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', 
    paddingVertical: 15, 
    backgroundColor: '#8000FF',
    borderRadius: 20, 
   
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10, 
  },
  icon: {
    marginLeft: 5, 
  },
});
