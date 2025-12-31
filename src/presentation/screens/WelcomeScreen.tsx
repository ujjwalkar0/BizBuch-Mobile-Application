import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { WelcomeNavigationProp } from '../navigation/auth-screen-navigation/AuthScreenStackParamList';
import Logo from '../../assets/images/logo.svg';

const { width } = Dimensions.get('window');
const AnimatedLogo = Animated.createAnimatedComponent(Logo);

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();

  // Animations
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const contentTranslate = useRef(new Animated.Value(30)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const buttonTranslate = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo / Illustration */}
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
      {/* Text */}
      <Animated.View
        style={{
          opacity: contentOpacity,
          transform: [{ translateY: contentTranslate }],
        }}
      >
        <Text variant="headlineMedium" style={styles.title}>
          Welcome to BizBuch
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Connect, share, and grow your professional network.
        </Text>
      </Animated.View>
      {/* Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonOpacity,
            transform: [{ translateY: buttonTranslate }],
          },
        ]}
      >
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        >
          Login
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Button>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 32,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#FF9933',
  },
  registerButton: {
    borderRadius: 8,
    borderColor: '#E65100',
  },
  buttonText: {
    color: '#E65100',
  },
});
