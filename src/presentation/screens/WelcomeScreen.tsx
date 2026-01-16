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

  return (
    <View style={styles.container}>
      {/* Logo / Illustration */}
      <View style={{ flex: 0.5 }}>
        <Logo width={width * 0.6} height={width * 0.6} viewBox="0 0 500 500" />
      </View>
      {/* Title */}
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to BizBuch
      </Text>

      {/* Subtitle */}
      <Text variant="bodyMedium" style={styles.subtitle}>
        Connect, share, and grow your business network.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
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

        <Button
          mode="text"
          // onPress={() => navigation.navigate('AdvancedSettings')}
          style={styles.advancedButton}
          labelStyle={styles.advancedText}
        >
          Advanced Settings
        </Button>
      </View>
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
    borderColor: '#FF9933',
  },
  buttonText: {
    color: '#E65100',
  },
  advancedButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  advancedText: {
    color: '#999',
    fontSize: 14,
  },
});
