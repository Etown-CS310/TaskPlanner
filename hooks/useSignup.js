import { useState } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';


export default function useSignup() {
    // Navigation and State Variables
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigation = useNavigation();

    const handleSignup = async () => {
        // Trim Values
        setUsername(username.trim());
        setEmail(email.trim());
        setPassword(password.trim());
        setConfirmPassword(confirmPassword.trim());

        // Email, Username, and Password Validations
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
        } 
        
        // Firebase Signup
        try {
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

    return { username, setUsername, email, setEmail, password, setPassword, confirmPassword,
             setConfirmPassword, showPassword, setShowPassword, showConfirmPassword,
             setShowConfirmPassword, handleSignup};
}