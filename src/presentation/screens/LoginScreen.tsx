import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

import { LoginNavigationProp } from '../navigation/auth-screen-navigation/AuthScreenStackParamList';
import { useLoginForm } from '../../ui/form-hooks/useLoginForm';
import { useLogin } from '../../ui/hooks/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { usePasswordVisibility } from '../../ui/hooks/usePasswordVisibility';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const password = usePasswordVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    rules,
  } = useLoginForm();

  const { mutateAsync, isPending, error } = useLogin();

  const onSubmitHandler = async (data: {
    username: string;
    password: string;
  }) => {
    try {
      await mutateAsync(data, {
        onSuccess: async (response) => {
          await AsyncStorage.setItem('authToken', response.access);
          await AsyncStorage.setItem('refreshToken', response.refresh);
          // Cache user profile photo for header avatar
          if (response.user.profile_photo) {
            await AsyncStorage.setItem('userProfilePhoto', response.user.profile_photo);
          }
          navigation.replace('BizBuch');
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
            theme={theme}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={rules.password}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            secureTextEntry={password.isHidden}
            value={value}
            onChangeText={onChange}
            error={!!errors.password}
            theme={theme}
            right={
              <TextInput.Icon
                icon={() => <FontAwesomeIcon icon={password.icon} />}
                onPress={password.toggleVisibility}
              />
            }
          />
        )}
      />
      {error && (
        <HelperText type="error">
          {error.message || 'Login failed. Please try again.'}
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
    outlineColor: '#f29520',
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
