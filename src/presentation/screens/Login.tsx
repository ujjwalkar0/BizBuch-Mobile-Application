import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AuthNavigator';

type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

type LoginFormData = {
  username: string;
  password: string;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: call login API
      console.log(data);
    } catch (err) {
      setError('root', {
        type: 'server',
        message: 'Invalid username or password',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {/* Username */}
      <Controller
        control={control}
        name="username"
        rules={{
          required: 'Username is required',
        }}
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
        <HelperText type="error" visible>
          {errors.username.message}
        </HelperText>
      )}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 6 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <HelperText type="error" visible>
          {errors.password.message}
        </HelperText>
      )}

      {/* Server error */}
      {errors.root && (
        <HelperText type="error" visible>
          {errors.root.message}
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.loginButton}
        contentStyle={styles.loginContent}
        buttonColor="#f29520"
        textColor="#fff"
        loading={isSubmitting}
        disabled={isSubmitting}
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