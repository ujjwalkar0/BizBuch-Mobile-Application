import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreenNavigation from './auth-screen-navigation/AuthScreenNavigation';

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthScreenNavigation />
    </NavigationContainer>
  );
};

export default RootNavigator;