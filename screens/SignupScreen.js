import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import InputField from '../components/UI/InputField';
import InputPasswordField from '../components/UI/InputPasswordField';
import Button from '../components/UI/Button';
import useSignup from "../hooks/useSignup";

function SignupScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const {username, setUsername, email, setEmail, password, setPassword, confirmPassword,
            setConfirmPassword, showPassword, setShowPassword, showConfirmPassword,
            setShowConfirmPassword, handleSignup} = useSignup();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* 
                2 Input Fields: Username and Email
                2 Input Password Fields: Password and Confirm Password
                Signup Button
                Back Button (Top Left)
            */}
            <Text style={[styles.textStyle, { color: theme.colors.text }]}>Enter User Details to Signup</Text>
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
                    <Ionicons name="arrow-back-outline" size={24} color={theme.colors.text} />
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