// Screen to input username, email, and password for account creation
import { useState } from 'react';
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import InputField from '../components/InputField';
import InputPasswordField from '../components/InputPasswordField';
import Button from '../components/Button';

function SignupScreen() {

        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const navigation = useNavigation();
        

        const handleSignup = () => {
            setUsername(username.trim());
            setEmail(email.trim());
            setPassword(password.trim());
            setConfirmPassword(confirmPassword.trim());

            const emailIsValid = email.includes('@') && email.includes('.');
            const passwordIsValid = password.length >= 8 && 
                  password.includes('#' || '!' || '?' || '$' || '%') && /[0-9]/.test(password);


            if (!username){
                Alert.alert('Invalid Input', 'Please enter a valid username to signup.');
                return;
            } if (!email || !emailIsValid){
                Alert.alert('Invalid Input', 'Please enter a valid email to signup.');
                return;
            } if (!password || !passwordIsValid){
                Alert.alert('Invalid Input', `Please enter a valid password to signup. 
                            \n\nPassword must be at least 8 characters long and include:
                            \n   • An uppercase letter
                            \n   • A special character( #, !, ?, $, % )
                            \n   • A number (0 - 9)`);
                return;
            } if (!confirmPassword) {
                Alert.alert('Invalid Input', 'Please confirm your password.');
                return;
            } if (password === confirmPassword){
                Alert.alert('Invalid Input', 'Passwords do not match. Please try again.');
                return;
            }
            navigation.navigate('Login');
        };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Enter User Details to Signup</Text>
            <InputField value={username} title={"Enter Username"} onChangeText={setUsername} />
            <InputField value={email} title={"Enter Email"} onChangeText={setEmail} />
            <InputPasswordField
                value={password}
                title={"Enter Password"}
                onChangeText={setPassword}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <InputPasswordField
                value={confirmPassword}
                title={"Confirm Password"}
                onChangeText={setConfirmPassword}
                showPassword={showConfirmPassword}
                toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <Button 
                title={'Signup'}
                onPress={handleSignup}
            />

        </View>
    );
    
}

export default SignupScreen;

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
    }
});