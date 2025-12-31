import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useVerifyToken } from '../../ui/hooks/useVerifyToken';
import { WelcomeNavigationProp } from '../navigation/auth-screen-navigation/AuthScreenStackParamList';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();

  const { mutateAsync, isPending } = useVerifyToken();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeScreen' }],
        });
        return;
      }

      try {
        await mutateAsync(
          { token },
          {
            onSuccess: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'BizBuch' }],
              });
            },
            onError: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'WelcomeScreen' }],
              });
            },
          },
        );
      } catch {
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeScreen' }],
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/images/logo.png')} //
        style={styles.logo}
        resizeMode="contain"
      /> */}

      <ActivityIndicator size="small" color="#000" style={styles.loader} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 96,
    height: 96,
  },
  loader: {
    marginTop: 24,
  },
});
