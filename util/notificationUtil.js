import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Load notification preference from storage
 */
export async function loadNotificationPreference() {
  try {
    const savedDays = await AsyncStorage.getItem('notifyDaysInAdvance');
    return savedDays ? parseInt(savedDays, 10) : 3; // Default 3 days
  } catch (error) {
    console.error('Error loading notification preference:', error);
    return 3;
  }
}

/**
 * Save notification preference to storage
 */
export async function saveNotificationPreference(days) {
  try {
    const clampedDays = Math.max(1, Math.min(30, days));
    await AsyncStorage.setItem('notifyDaysInAdvance', String(clampedDays));
    return clampedDays;
  } catch (error) {
    console.error('Error saving notification preference:', error);
    return days;
  }
}

/**
 * Validate and clamp notification days value
 */
export function validateNotificationDays(value) {
  const days = parseInt(value, 10);
  if (isNaN(days)) return 3;
  return Math.max(1, Math.min(30, days));
}
