import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { account } from '@/lib/config';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import React from 'react';
interface Props {
  navigation: NavigationProp<any>;
}

export default function VerifyEmailScreen({navigation}: Props) {

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const secret = params.get('secret');

        if (userId && secret) {
          await account.updateVerification(userId, secret);
          Toast.show({
            type: 'success',
            text1: 'Email verified successfully',
          });
          navigation.navigate('signIn');
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Verification failed',
          text2: error.message
        });
      }
    };

    verifyEmail();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Verifying your email...</Text>
    </View>
  );
}