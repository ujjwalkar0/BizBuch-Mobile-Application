import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { LoginNavigationProp } from '../navigation/auth-screen-navigation/AuthScreenStackParamList';
import { useLoginForm } from '../../ui/form-hooks/useLoginForm';
import { useLogin } from '../../ui/hooks/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    rules,
  } = useLoginForm();

  const { mutateAsync, isPending, error } = useLogin();

  const onSubmitHandler = async (data: { username: string; password: string }) => {
    try {
      await mutateAsync(data, {
        onSuccess: (data) => {
          AsyncStorage.setItem('authToken', data.access);
          AsyncStorage.setItem('refreshToken', data.refresh);
          navigation.navigate('BizBuch');
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../../assets/images/azadi.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <Controller
        control={control}
        name="username"
        rules={rules.username}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Username"
            mode="outlined"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            error={!!errors.username}
          />
        )}
      />
      {errors.username && (
        <HelperText type="error">{errors.username.message}</HelperText>
      )}

      <Controller
        control={control}
        name="password"
        rules={rules.password}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <HelperText type="error">{errors.password.message}</HelperText>
      )}

      {error && (
        <HelperText type="error">
          Invalid username or password
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmitHandler)}
        style={styles.loginButton}
        contentStyle={styles.loginContent}
        buttonColor="#f29520"
        textColor="#fff"
        loading={isSubmitting || isPending}
      >
        Login
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        textColor="#666"
        rippleColor="transparent"
      >
        Don&apos;t have an account? Register
      </Button>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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