import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/presentation/navigation/RootNavigator';
import { queryClient } from './src/ui/queryClient';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
};

export default App;