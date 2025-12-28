import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AuthNavigator';
// import HOST from '../Hosts';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const Register: React.FC<Props> = ({ navigation }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');

  // const submit = async () => {
  //   if (!first_name || !last_name || !email || !username || !password || !confirm_password) {
  //     setMsg('All fields are required');
  //   } else if (password !== confirm_password) {
  //     setMsg("Passwords don't match");
  //   } else {
  //     try {
  //       const response = await fetch(`${HOST}/users/register/`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           username,
  //           password,
  //           confirm_password,
  //           first_name,
  //           last_name,
  //           email,
  //         }),
  //       });

  //       const content = await response.json();
  //       if (content.token) {
  //         await AsyncStorage.setItem('token', content.token);
  //         navigation.navigate('HomeScreen');
  //       } else {
  //         setMsg(content.message || 'Registration failed');
  //       }
  //     } catch (error) {
  //       console.error('Registration error:', error);
  //       setMsg('Something went wrong. Please try again.');
  //     }
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.center}>
        {/* <Image source={require('../assets/images/azadi.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and start your journey</Text>

        <View style={styles.row}>
          <TextInput
            label="First Name"
            mode="outlined"
            style={styles.inputHalf}
            value={first_name}
            onChangeText={setFirstName}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={styles.inputHalf}
            value={last_name}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          label="Username"
          mode="outlined"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <View style={styles.row}>
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.inputHalf}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            style={styles.inputHalf}
            value={confirm_password}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {msg !== '' && <HelperText type="error" visible>{msg}</HelperText>}

        <Button
          mode="contained"
          // onPress={submit}
          style={styles.button}
          contentStyle={styles.buttonContent}
          buttonColor="#f29520"
          textColor="#fff"
        >
          Register
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.link}
          textColor="#02a34e"
        >
          Already have an account? Login
        </Button>

        {/* <Image source={require('../assets/images/logo.png')} style={styles.footerLogo} /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  scroll: {
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 140,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
    color: '#2d3436',
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
  inputHalf: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 8,
    width: '100%',
  },
  buttonContent: {
    height: 48,
  },
  link: {
    marginTop: 12,
  },
  footerLogo: {
    width: 280,
    height: 100,
    marginTop: 32,
    resizeMode: 'contain',
  },
});