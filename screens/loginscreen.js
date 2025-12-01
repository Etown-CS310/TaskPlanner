import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import InputField from '../components/UI/InputField';
import InputPasswordField from '../components/UI/InputPasswordField';
import Button from '../components/UI/Button';


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


        const handleBack = async () => {
            await AsyncStorage.removeItem('userChoice');
            await AsyncStorage.removeItem('isFirstLaunch');
            navigation.goBack();
        };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Enter User Details to Login
            </Text>
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
            <Button 
                title={'Login'}
                onPress={handleLogin}
            />
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