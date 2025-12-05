import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook to manage storage method (local vs cloud) and user choice
 */
export function useStorageMethod() {
  const [storageMethod, setStorageMethod] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const fetchUserChoice = async () => {
    try {
      const choice = await AsyncStorage.getItem('userChoice');
      if (choice) {
        setStorageMethod(choice);
      }
      setInitialized(true);
    } catch (error) {
      console.error('Error fetching user choice: ', error);
      setInitialized(true);
    }
  };

  useEffect(() => {
    fetchUserChoice();
  }, []);

  useEffect(() => {
    if (!storageMethod) {
      setStorageMethod('local');
    }
  }, [storageMethod]);

  return {
    storageMethod,
    setStorageMethod,
    initialized,
  };
}
