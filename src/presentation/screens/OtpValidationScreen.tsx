import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useVerifyOtp } from '../../ui/hooks/useVerifyOtp';
import { useNavigation } from '@react-navigation/native';
import { OtpValidationNavigationProp } from '../navigation/auth-screen-navigation/AuthScreenStackParamList';

const OTP_LENGTH = 6;

export const OtpValidationScreen = ({ route }: any) => {
  const { email } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<TextInput[]>([]);
  const verifyOtp = useVerifyOtp();

  const navigation = useNavigation<OtpValidationNavigationProp>();

  const onChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const onSubmitHandler = () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) return;

    verifyOtp.mutateAsync(
      { email, otp: code },
      {
        onSuccess: () => {
          console.log('OTP verified');
          navigation.navigate('Login');
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>

      <View style={styles.row}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={v => onChange(v, i)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
        <Text style={styles.buttonText}>
          {verifyOtp.isPending ? 'Verifying...' : 'Verify'}
        </Text>
      </TouchableOpacity>

      {verifyOtp.isError && <Text style={styles.error}>Invalid OTP</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  input: {
    width: 48,
    height: 56,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#f29520',
    marginTop: 32,
    padding: 14,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  error: { color: 'red', textAlign: 'center', marginTop: 12 },
});
