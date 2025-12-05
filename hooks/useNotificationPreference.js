import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook to manage notification preferences
 */
export function useNotificationPreference() {
  const [notifyDaysInAdvance, setNotifyDaysInAdvance] = useState('3');
  const [notifyDaysInput, setNotifyDaysInput] = useState('3');

  const loadNotificationPreference = async () => {
    try {
      const savedDays = await AsyncStorage.getItem('notifyDaysInAdvance');
      if (savedDays) {
        setNotifyDaysInAdvance(savedDays);
        setNotifyDaysInput(savedDays);
      }
    } catch (error) {
      console.error('Error loading notification preference:', error);
    }
  };

  useEffect(() => {
    loadNotificationPreference();
  }, []);

  const handleNotifyDaysChange = (value) => {
    // Allow only numeric input
    const numericValue = value.replace(/[^0-9]/g, '');
    setNotifyDaysInput(numericValue);
  };

  const saveNotifyDays = async (updateCallback) => {
    try {
      const days = Math.max(1, Math.min(30, parseInt(notifyDaysInput) || 3)); // Clamp between 1-30
      await AsyncStorage.setItem('notifyDaysInAdvance', String(days));
      setNotifyDaysInAdvance(String(days));
      setNotifyDaysInput(String(days));
      if (updateCallback) {
        await updateCallback(days);
      }
    } catch (error) {
      console.error('Error saving notification preference:', error);
    }
  };

  return {
    notifyDaysInAdvance,
    notifyDaysInput,
    setNotifyDaysInput,
    handleNotifyDaysChange,
    saveNotifyDays,
  };
}
