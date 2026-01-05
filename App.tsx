import React, { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/presentation/navigation/RootNavigator';
import { queryClient } from './src/ui/queryClient';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
};

export default App;
