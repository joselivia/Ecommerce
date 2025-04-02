import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { signOut } from '@/lib/config';
import Toast from 'react-native-toast-message';
interface Props {
    navigation: NavigationProp<any>;
}
export default function AccountScreen ({navigation}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async() => {
    setModalVisible(false);
try{
await signOut();
Toast.show({type:"success", text1:"Logout successful"});
navigation.reset({index:0, routes:[{name:"signIn"}]});
}catch(error:any){
  console.log(error);
}
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
             <TouchableOpacity onPress={() => navigation.goBack()}>
               <Ionicons name="arrow-back-outline" size={24} color="black" />
             </TouchableOpacity>
             <Text style={styles.Title}>Account</Text>
             <TouchableOpacity onPress={() => navigation.navigate("notification")}>
               <Ionicons name="notifications-outline" size={24} color="black" />
             </TouchableOpacity>
           </View>
      <ScrollView>
      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("Mydetail")}>
        <View style={styles.cardContent}>
          <Ionicons name="person-circle-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.cardText}>My Details</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("MyOrder")}>
        <View style={styles.cardContent}>
        <Feather name="codesandbox" size={24} color="black" style={styles.icon}/>
          <Text style={styles.cardText}>My Orders</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
   
       <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("PaymentMethod")}>
        <View style={styles.cardContent}>
          <Ionicons name="card-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.cardText}>Payment Methods</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("notification")}>
        <View style={styles.cardContent}>
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.cardText}>Notifications</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("HelpCenter")}>
        <View style={styles.cardContent}>
          <Ionicons name="help-circle-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.cardText}>Help Center</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <View style={styles.cardContent}>
          <SimpleLineIcons name="logout" size={24} color="red" style={styles.icon} />
          <Text style={styles.cardText}>Logout</Text>
        </View>
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout?</Text>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>

            {/* Buttons */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Yes, Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>No, Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  
</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  notificationIcon: {
    position: 'absolute',
    top: 30,
    right: 10,
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
 

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  warningIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

