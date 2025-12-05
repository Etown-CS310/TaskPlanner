import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load theme preference on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('darkMode');
        if (savedTheme !== null) {
          setIsDarkMode(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference when it changes
  const toggleDarkMode = async (value) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#1a1a1a' : '#fff',
      text: isDarkMode ? '#fff' : '#000',
      textSecondary: isDarkMode ? '#ccc' : '#888',
      border: isDarkMode ? '#333' : '#000',
      surface: isDarkMode ? '#2a2a2a' : '#f2f2f2',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleDarkMode, loaded }}>
      {children}
    </ThemeContext.Provider>
  );
};
