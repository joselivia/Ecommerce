import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import SavedBoardsScreen from "./Board"; 
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ItemWishScreen from "./ItemWish"; 
import { RootStackParamList } from "../../lib/types"; 

interface Props {
  navigation: NavigationProp<RootStackParamList, "wishlist">;
  route: RouteProp<RootStackParamList, "wishlist">;
}

export default function WishListScreen({ navigation, route }: Props) {
  const [activePage, setActivePage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handlePageChange = (pageIndex: number) => {
    setActivePage(pageIndex);
    pagerRef.current?.setPage(pageIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WishList</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={[styles.btn, activePage === 0 && styles.activeBtn]}
          onPress={() => handlePageChange(0)}
        >
          <Text>Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, activePage === 1 && styles.activeBtn]}
          onPress={() => handlePageChange(1)}
        >
          <Text>Board</Text>
        </TouchableOpacity>
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
      >
        <View key="1" style={styles.page}>
          <ItemWishScreen /> 
        </View>
        <View key="2" style={styles.page}>
          <SavedBoardsScreen navigation={navigation} route={route} />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    padding: 5,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  activeBtn: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    paddingBottom: 2,
  },
  pagerView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  page: {
    padding: 10,
    backgroundColor: "#fff",
  },
});