import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import InputField from '../components/UI/InputField';
import InputPasswordField from '../components/UI/InputPasswordField';
import Button from '../components/UI/Button';

    function LoginScreen() {
        // Navigation and State Variables
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const navigation = useNavigation();

        // Authenticate User
        const authenticate = async (username, password) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, username, password);
                const user = userCredential.user;
                return user.uid;
            } catch (error) {
                console.error("Login error: ", error);
                return null;
            }
        }
    
    // Handle Login Button Press
    // Updates AsyncStorage to 'cloud' and saves userId upon login
    // Otherwise shows an alert for invalid credentials
    const handleLogin = async () => {
        if (username && password) {
            const fetchedUserId = await authenticate(username, password);
            if (fetchedUserId) {
                await AsyncStorage.setItem('userId', fetchedUserId);
                await AsyncStorage.setItem('userChoice', 'cloud');
                navigation.navigate('Main');
            } else {
            Alert.alert('An Error has occurred', 'Invalid username or password. Please try again.');
            }
        } else {
            Alert.alert('An Error has occured', 'Invalid username or password. Please try again.');
    }};

    // Handle Back Button Press Logic
    const handleBack = async () => {
        await AsyncStorage.removeItem('userChoice');
        await AsyncStorage.removeItem('isFirstLaunch');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/*  
                Text Prompt for User
                Input Field for username or email
                Input Password Field for password
                Login Buttton for authentication
                Signup Button to navigate to Signup Screen
                Back Button to return to previous screen
            */}
            <Text style={styles.textStyle}>Enter User Details to Login</Text>
            <InputField
                value={username}
                title={"Enter Username"}
                onChangeText={setUsername}
            />
            <InputPasswordField
                value={password}
                title={"Enter Password"}
                onChangeText={setPassword}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <Button title={'Login'} onPress={handleLogin}/>
            <Button
                title={'Signup'}
                style={styles.signupButton}
                textStyle={styles.signupTextStyle}
                onPress={() => navigation.navigate('Signup')}
            />

        <View style={styles.backButton}>
            <TouchableOpacity  onPress={handleBack}>
                <Ionicons name="arrow-back-outline" size={24} />
            </TouchableOpacity>
        </View>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    signupButton: {
        backgroundColor: '#fff',
        marginTop: 10,
        width: '17.5%',
        paddingVertical: 5,
    },
    signupTextStyle: {
        color: '#007bff',
    },
    backButton: {
        position: 'absolute',
        top: 50, 
        left: 30,
        borderWidth: 2,
        borderRadius: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backTextStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 26,
    }
});