import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./index";
import SignInScreen from "./Auth/SignInScreen";
import SignUpScreen from "./Auth/SignUpScreen";
import TabLayout from "./tabs/tabs";
import NotificationScreen from "./components/Notification";
import CustomerServiceScreen from "./components/CustomerService";
import MyOrdersScreen from "./orders/Myorder";
import HelpCenterScreen from "./components/HelpCenter";
import OrderStatusScreen from "./orders/Orderstatus";
import CheckoutScreen from "./orders/Checkout";
import NewAddressScreen from "./orders/NewAddress";
import PaymentMethodScreen from "./payment/paymentmeth";
import NewCardScreen from "./payment/newcard";
import TrackOrder from "./orders/TrackOrder";
import MyDetails from "./Auth/Mydetails";
import UserInfo from "./Auth/MyInfo";
import WishListScreen from "./components/WishList";
import ProductDetailScreen from "./components/productdetail";
import Toast from "react-native-toast-message";
import ResetPassScreen from "./Auth/Resetpass";
import VerificationScreen from "./Auth/Resetverification";
import GlobalProvider from "../lib/GlobalProvider";
import CartScreen from "./pages/Cart";
import HomeScreen from "./pages/home";
import SavedBoardsScreen from "./components/Board";
const Stack = createNativeStackNavigator();

export default function RootLayout() {
   return (
    <>
    <Stack.Navigator initialRouteName= "index">
   <Stack.Screen name="tabs" component={TabLayout} options={{ headerShown: false }} />
   <Stack.Screen name="index" component={Index} options={{ headerShown: false }} />
    <Stack.Screen name="signIn" component={SignInScreen} options={{ title: "Sign In", headerTitleAlign: "center" }} />
      <Stack.Screen name="signUp" component={SignUpScreen} options={{ title: "Sign Up", headerTitleAlign: "center" }} />
      <Stack.Screen name="notification" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="resetPassword" component={ResetPassScreen} options={{ title: "Reset Password", headerTitleAlign: "center" }} />
      <Stack.Screen name="Resetverification" component={VerificationScreen} options={{ title: "Verification", headerTitleAlign: "center" }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Customerservice" component={CustomerServiceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyOrder" component={MyOrdersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ title: "Help Center", headerTitleAlign: "center"}} />
      <Stack.Screen name="OrderComplete" component={OrderStatusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewAddress" component={NewAddressScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddCard" component={NewCardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} options={{ headerShown: false }} />
      <Stack.Screen name="Mydetail" component={MyDetails} options={{ headerShown: false }} />
      <Stack.Screen name="userinfo" component={UserInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Orderstatus" component={OrderStatusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="wishlist" component={WishListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
      <Toast/>
      </>
  );
}
