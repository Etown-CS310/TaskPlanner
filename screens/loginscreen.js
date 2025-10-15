import { useState } from 'react';
import { StyleSheet, View, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import UsernameInput from '../components/UsernameInput';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';

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
            <UsernameInput value={username} onChangeText={setUsername} />
            <PasswordInput
                value={password}
                onChangeText={setPassword}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <Button title={'Login'} onPress={handleLogin} />
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
    }
});