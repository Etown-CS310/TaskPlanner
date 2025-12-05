import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Load user ID from AsyncStorage
 */
export async function loadUserId() {
  try {
    const storedUserId = await AsyncStorage.getItem('userId');
    return storedUserId || 'defaultUser';
  } catch (error) {
    console.error('Error loading user ID:', error);
    return 'defaultUser';
  }
}

/**
 * Reset app preferences for demo purposes
 */
export async function resetAppPreferences() {
  try {
    await AsyncStorage.removeItem('isFirstLaunch');
    await AsyncStorage.removeItem('userChoice');
  } catch (error) {
    console.error('Error resetting app preferences:', error);
  }
}

/**
 * Get default sort criteria
 */
export function getDefaultSortCriteria() {
  return 'All';
}
