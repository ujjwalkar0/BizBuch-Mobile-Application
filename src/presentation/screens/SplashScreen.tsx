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
    const timer = setTimeout(() => {
      const verifyToken = async () => {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          try {
            await mutateAsync(
              { token },
              {
                onSuccess: () => {
                  navigation.navigate('BizBuch');
                },
                onError: () => {
                  navigation.navigate('WelcomeScreen');
                },
              },
            );
          } catch (e) {
            navigation.navigate('WelcomeScreen');
          }
        } else {
          navigation.navigate('WelcomeScreen');
        }
      };

      verifyToken();
    }, 5000);

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
