import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../presentation/navigation/AuthNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Optional logo */}
      {/* <Image source={require('../assets/images/azadi.png')} style={styles.logo} /> */}

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput
        label="Username"
        mode="outlined"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {msg !== '' && <HelperText type="error" visible>{msg}</HelperText>}

      <Button
        mode="contained"
        onPress={() => {}}
        style={styles.loginButton}
        contentStyle={styles.loginContent}
        buttonColor="#f29520"
        textColor="#fff"
      >
        Login
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        textColor="#02a34e"
      >
        Don't have an account? Register
      </Button>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 140,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  loginButton: {
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 12,
  },
  loginContent: {
    height: 50,
  },
});