import { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook to manage logout state and prevent unintended navigation
 */
export function useLogout(storageMethod, navigation) {
  const didLogout = useRef(false);

  const logout = async () => {
    try {
      didLogout.current = true;
      await AsyncStorage.setItem('userChoice', 'local');
      // await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  useEffect(() => {
    if (didLogout.current && storageMethod === 'local') {
      navigation.navigate('Main');
    }
  }, [storageMethod, navigation]);

  return { logout, didLogout };
}
