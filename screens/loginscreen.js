import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Alert, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

import showPasswordIcon from '../assets/images/show-password.png';
import hidePasswordIcon from '../assets/images/hide-password.png';

    function LoginScreen() {

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const navigation = useNavigation();

    const handleLogin = () => {
        if (username && password) {
            navigation.navigate('Main');
        } else {
            Alert.alert('An Error has occured', 'Invalid username or password. Please try again.');
    }};

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='Enter Username'
                value={username}
                onChangeText={setUsername}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                    source={showPassword ? hidePasswordIcon : showPasswordIcon}
                    style={styles.icon}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            </View>

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable> 

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
    textInput: {
        width: '75%',
        padding: 12,
        marginVertical: 12,
        borderWidth: 3,
        borderColor: '#ccc',
        borderRadius: 6,
        fontSize: 16,
        fontWeight: 400,
    },
    passwordContainer: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        marginVertical: 12,
        backgroundColor: '#fff',
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    button:{
        marginTop: 12,
        width: '65%',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});