import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

const statusSteps = [
  { id: "1", label: "Packing", address: "2336 Jack Warren Rd, Delta Junction, Alaska 99731" },
  { id: "2", label: "Picked", address: "2417 Tongass Ave #111, Ketchikan, Alaska 99901" },
  { id: "3", label: "In Transit", address: "16 Rr 2, Ketchikan, Alaska 99901, USA" },
  { id: "4", label: "Delivered", address: "925 S Chugach St #APT 10, Alaska 99645" }
];

export default function TrackOrder({ navigation }: Props) {
  const [currentStep, setCurrentStep] = useState(1); 

  const mapRegion = {
    latitude: 55.342,
    longitude: -131.646,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [
    { coordinate: { latitude: 55.342, longitude: -131.646 }, title: "Pickup Location" },
    { coordinate: { latitude: 55.3425, longitude: -131.6465 }, title: "Delivery Location" }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Track Order</Text>
        <TouchableOpacity onPress={() => navigation.navigate("notification")}> 
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <MapView style={styles.map} initialRegion={mapRegion}>
        <Marker coordinate={markers[0].coordinate} title={markers[0].title} />
        <Marker coordinate={markers[1].coordinate} title={markers[1].title} />
        <Polyline coordinates={[markers[0].coordinate, markers[1].coordinate]} strokeColor="black" strokeWidth={3} />
      </MapView>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Order Status</Text>
        <FlatList
          data={statusSteps}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.statusItem}>
              <View style={[styles.statusIcon, index <= currentStep && styles.activeStatus]} />
              <View>
                <Text style={[styles.statusLabel, index <= currentStep && styles.activeLabel]}>{item.label}</Text>
                <Text style={styles.statusAddress}>{item.address}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.deliveryInfo}>
        <Image source={require('../../assets/images/R.jpeg') } style={styles.avatar} />
        <View>
          <Text style={styles.deliveryPerson}>Jacob Jones</Text>
          <Text style={styles.deliveryRole}>Delivery Guy</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  title: { fontSize: 18, fontWeight: "bold" },
  map: { height: "40%" },
  statusContainer: { backgroundColor: "#fff", padding: 16 },
  statusTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  statusItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  statusIcon: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#ccc", marginRight: 12 },
  activeStatus: { backgroundColor: "purple" },
  statusLabel: { fontSize: 16, color: "#555" },
  activeLabel: { color: "purple", fontWeight: "bold" },
  statusAddress: { fontSize: 14, color: "#777" },
  deliveryInfo: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  deliveryPerson: { fontSize: 16, fontWeight: "bold" },
  deliveryRole: { fontSize: 14, color: "#777" },
  callButton: { marginLeft: "auto", backgroundColor: "black", padding: 10, borderRadius: 20 },
});
