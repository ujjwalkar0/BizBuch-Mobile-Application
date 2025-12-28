import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../presentation/navigation/AuthNavigator';
import { RegisterPayload } from '../domain/auth/entities/Auth';
import { useRegister } from '../ui/hooks/useRegister';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
};

type RegisterFormData = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  recaptcha_token: string;
};

const Register: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      recaptcha_token: '123',
    },
  });

  const passwordValue = watch('password');
  const { mutateAsync, isPending, error } = useRegister();
  const onSubmit = async (data: RegisterPayload) => {
    try {
      const response = await mutateAsync(data);
      await AsyncStorage.setItem('token', response.token);
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.center}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and start your journey</Text>

        {/* First & Last Name */}
        <View style={styles.row}>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: 'First name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="First Name"
                mode="outlined"
                style={styles.inputHalf}
                value={value}
                onChangeText={onChange}
                error={!!errors.first_name}
              />
            )}
          />
          <Controller
            control={control}
            name="last_name"
            rules={{ required: 'Last name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Last Name"
                mode="outlined"
                style={styles.inputHalf}
                value={value}
                onChangeText={onChange}
                error={!!errors.last_name}
              />
            )}
          />
        </View>

        {/* Email */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <HelperText type="error">{errors.email.message}</HelperText>
        )}

        {/* Username */}
        <Controller
          control={control}
          name="username"
          rules={{ required: 'Username is required' }}
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

        {/* Passwords */}
        <View style={styles.row}>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password"
                mode="outlined"
                style={styles.inputHalf}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                error={!!errors.password}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            rules={{
              required: 'Confirm your password',
              validate: value =>
                value === passwordValue || 'Passwords do not match',
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Confirm Password"
                mode="outlined"
                style={styles.inputHalf}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                error={!!errors.confirm_password}
              />
            )}
          />
        </View>

        {errors.confirm_password && (
          <HelperText type="error">
            {errors.confirm_password.message}
          </HelperText>
        )}

        {/* Submit */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          contentStyle={styles.buttonContent}
          buttonColor="#f29520"
          textColor="#fff"
          loading={isSubmitting}
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
});
