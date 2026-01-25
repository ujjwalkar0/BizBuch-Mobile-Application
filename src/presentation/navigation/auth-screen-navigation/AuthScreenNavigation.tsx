import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import { OtpValidationScreen } from '../../screens/OtpValidationScreen';
import { RootStackParamList } from '../RootStackParamList';
import { BottomNavigationTemplate } from '../../components/templates/BottomNavigationTemplate';
import WelcomeScreen from '../../screens/WelcomeScreen';
import SplashScreen from '../../screens/SplashScreen';
import { AdvancedSettingsScreen } from '../../screens/AdvancedSettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthScreenNavigation: React.FC = () => (

  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="OtpValidation" component={OtpValidationScreen} />
    <Stack.Screen name="BizBuch" component={BottomNavigationTemplate} options={{headerShown: false}}/>
    <Stack.Screen name="AdvancedSettings" component={AdvancedSettingsScreen} />
  </Stack.Navigator>

);

export default AuthScreenNavigation;