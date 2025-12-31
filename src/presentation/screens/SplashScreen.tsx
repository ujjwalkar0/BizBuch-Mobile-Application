import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useVerifyToken } from '../../ui/hooks/useVerifyToken';
import { WelcomeNavigationProp } from '../navigation/auth-screen-navigation/AuthScreenStackParamList';
import Logo from '../../assets/images/logo.svg';

const { width } = Dimensions.get('window');
const AnimatedLogo = Animated.createAnimatedComponent(Logo);

const SplashScreen: React.FC = () => {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<WelcomeNavigationProp>();

  const { mutateAsync, isPending } = useVerifyToken();

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      const verifyToken = async () => {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          try {
            await mutateAsync(
              { token },
              {
                onSuccess: () => {
                  navigation.replace('BizBuch');
                },
                onError: () => {
                  navigation.replace('WelcomeScreen');
                },
              },
            );
          } catch (e) {
            navigation.replace('WelcomeScreen');
          }
        } else {
          navigation.replace('WelcomeScreen');
        }
      };

      verifyToken();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      {/* <Animated.Image
        source={require('../../assets/images/logo.png')}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      /> */}
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
      >
        <AnimatedLogo
          width={width * 0.6}
          height={width * 0.6}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 500 500"
        />
      </Animated.View>


      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
        }}
      >
        <Text style={styles.title}>BizBuch</Text>
        <Text style={styles.tagline}>Connecting Ideas & People</Text>
      </Animated.View>

      <ActivityIndicator color="#fff" style={{ marginTop: 30 }} />
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
    width: width * 0.6,
    height: width * 0.6,
  },
  loader: {
    marginTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#fff',
    marginTop: 6,
    textAlign: 'center',
  },
});
