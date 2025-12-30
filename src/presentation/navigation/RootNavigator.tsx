import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useAuthGate } from '../../hooks/useAuthGate';
import AppNavigator from './AppNavigator';
import AuthScreenNavigation from './auth-screen-navigation/AuthScreenNavigation';
import { useVerifyToken } from '../../ui/hooks/useVerifyToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigator: React.FC = () => {
  const { mutateAsync, isPending, error } = useVerifyToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     const token = await AsyncStorage.getItem('authToken');
  //     if (token) {
  //       await mutateAsync({ token },
  //         {
  //           onSuccess: () => {
  //             setIsAuthenticated(true);
  //           },
  //           onError: () => {
  //             setIsAuthenticated(false);
  //           },
  //         }
  //       );
  //     }
  //   };
  //   verifyToken();
  // }, []);

  // if (isPending) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#636e72" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <AuthScreenNavigation />
      {/* {isAuthenticated ? <AppNavigator /> : <AuthScreenNavigation />} */}
    </NavigationContainer>
  );
};

export default RootNavigator;
