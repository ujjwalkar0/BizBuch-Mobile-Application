import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import { OtpValidationScreen } from '../../screens/OtpValidationScreen';
import { RootStackParamList } from '../RootStackParamList';
import BottomNavigationProvider from '../../components/BottomNavigationProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthScreenNavigation: React.FC = () => (

  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="OtpValidation" component={OtpValidationScreen} />
    <Stack.Screen name="BizBuch" component={BottomNavigationProvider} options={{headerShown: false}}/>
  </Stack.Navigator>

);

export default AuthScreenNavigation;