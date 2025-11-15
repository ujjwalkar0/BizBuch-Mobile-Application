import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigationProvider from '../components/BottomNavigationProvider';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="BizBuch" component={BottomNavigationProvider} options={{headerShown: false}}/>
  </Stack.Navigator>
);

export default AppNavigator;