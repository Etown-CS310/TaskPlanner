import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './context/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import FirstTimeScreen from './screens/FirstTimeScreen';
import SignupScreen from './screens/SignupScreen';
import SettingScreen from './screens/SettingScreen';
import UserInfoScreen from './screens/UserInfoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="FirstTime" component={FirstTimeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
