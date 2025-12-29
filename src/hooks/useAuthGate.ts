import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthGate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // await AsyncStorage.removeItem('authToken');
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
        //   const res = await fetch('https://yourapi.com/validate', {
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        //   if (res.ok) {
            setIsAuthenticated(true);
        //   }
        }
      } catch (err) {
        console.error('Token check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  return { isLoading, isAuthenticated };
};