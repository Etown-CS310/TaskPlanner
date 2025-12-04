import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {auth, db} from '../firebaseConfig';
import {doc, setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import InputField from '../components/UI/InputField';
import InputPasswordField from '../components/UI/InputPasswordField';
import Button from '../components/UI/Button';

function SignupScreen() {
    // Navigation and State Variables
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();
        
    // Handle Signup Logic
    // Validations for username, email, password, and confirm password
    // If all validations pass, create user in Firebase Auth and Firestore
    // Navigate to Login screen upon successful signup
    const handleSignup = async () => {
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
        } if (password !== confirmPassword){
            Alert.alert('Invalid Input', 'Passwords do not match. Please try again.');
            return;
        } try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            await setDoc(doc(db, "users", userId), {
                username: username,
                email: email,
                userId: userId
            });
            Alert.alert('Signup Successful', 'Your account has been created successfully!');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Signup Error', error.message);
        }   
    };

    return (
        <View style={styles.container}>
            {/* 
                2 Input Fields: Username and Email
                2 Input Password Fields: Password and Confirm Password
                Signup Button
                Back Button (Top Left)
            */}
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

            <View style={styles.backButton}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} />
                </TouchableOpacity>
            </View>

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