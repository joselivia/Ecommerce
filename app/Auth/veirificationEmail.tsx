import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { account } from '@/lib/config';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import Toast from "react-native-toast-message";

// Define the param list for your navigation stack
type RootStackParamList = {
  VerifyEmail: { userId: string; secret: string }; // Define expected params
  SignIn: undefined;
  // Add other screens as needed
};

// Define props with typed navigation and route
interface Props {
  navigation: NavigationProp<RootStackParamList, 'VerifyEmail'>;
}

export default function VerifyEmailScreen({ navigation }: Props) {
  // Use RouteProp to type the route
  const route = useRoute<RouteProp<RootStackParamList, 'VerifyEmail'>>();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get userId and secret from route params
        const { userId, secret } = route.params || {};
        console.log("Verification params received:", { userId, secret });

        if (userId && secret) {
          await account.updateVerification(userId, secret);
          console.log("Email verification successful for user:", userId);
          Toast.show({
            type: 'success',
            text1: 'Email Verified!',
            text2: 'You can now log in',
          });
          navigation.navigate('SignIn');
        } else {
          console.warn("Missing userId or secret in params");
          Toast.show({
            type: 'error',
            text1: 'Verification Failed',
            text2: 'Invalid verification link',
          });
        }
      } catch (error: any) {
        console.error("Verification error:", error.message || error);
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: error.message || 'Something went wrong',
        });
      }
    };

    verifyEmail();
  }, [navigation, route.params]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#ff4d4d" />
      <Text style={{ marginTop: 10, fontSize: 16, color: "#333" }}>
        Verifying your email...
      </Text>
    </View>
  );
}