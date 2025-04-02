import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../lib/types";
import { checkSession } from "@/lib/config";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import { CartProvider } from "./components/CartContext";

// Screens
import SignInScreen from "./Auth/SignInScreen";
import SignUpScreen from "./Auth/SignUpScreen";
import TabLayout from "./tabs/tabs";
import NotificationScreen from "./components/Notification";
import CustomerServiceScreen from "./components/CustomerService";
import MyOrdersScreen from "./orders/Myorder";
import HelpCenterScreen from "./components/HelpCenter";
import PaymentMethodScreen from "./payment/paymentmeth";
import NewCardScreen from "./payment/newcard";
import UserInfo from "./Auth/Profile";
import WishListScreen from "./components/WishList";
import ProductDetailScreen from "./components/productdetail";
import ResetPassScreen from "./Auth/Resetpass";
import VerificationScreen from "./Auth/Resetverification";
import VerifyEmailScreen from "./Auth/veirificationEmail";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const user = await checkSession();
        console.log("User from checkSession:", user);
        setIsSignedIn(!!user);
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    validateSession();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff4d4d" />
      </View>
    );
  }

  console.log("isSignedIn:", isSignedIn);

  return (
    <CartProvider>    
        <Stack.Navigator
          initialRouteName={isSignedIn ? "tabs" : "signIn"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="tabs" component={TabLayout} />
          <Stack.Screen
            name="signIn"
            component={SignInScreen}
            options={{ title: "Sign In", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen
            name="signUp"
            component={SignUpScreen}
            options={{ title: "Sign Up", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen
            name="verifyEmail"
            component={VerifyEmailScreen}
            options={{ title: "Verification", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen name="notification" component={NotificationScreen} />
          <Stack.Screen
            name="resetPassword"
            component={ResetPassScreen}
            options={{ title: "Reset Password", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen
            name="Resetverification"
            component={VerificationScreen}
            options={{ title: "Verification", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ title: "Product Details", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen name="Customerservice" component={CustomerServiceScreen} />
          <Stack.Screen name="MyOrder" component={MyOrdersScreen} />
          <Stack.Screen
            name="HelpCenter"
            component={HelpCenterScreen}
            options={{ title: "Help Center", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
          <Stack.Screen name="AddCard" component={NewCardScreen} />
          <Stack.Screen
            name="Mydetail"
            component={UserInfo}
            options={{ title: "Profile", headerTitleAlign: "center", headerShown: true }}
          />
          <Stack.Screen name="userinfo" component={UserInfo} />
          <Stack.Screen name="wishlist" component={WishListScreen} />
        </Stack.Navigator>
        <Toast />
          </CartProvider>
  );
}