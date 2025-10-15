// This screen shows up upon user launching the app for the first time
// It allows the user to select either a local or cloud account
// Cloud account brings them to login/signup screen while local brings them to main

import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

function FirstTimeScreen() {

    const navigation = useNavigation();

    const handleLocal = () => {
        navigation.navigate('Main');
    }

    const handleCloud = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to TaskPlanner!</Text>
            <Text style={styles.text}>Please choose how you would like to save your data:</Text>
            <Button title ={'Save Locally'} onPress={handleLocal} />
            <Button title ={'Save Across Devices'} onPress={handleCloud} />
        </View>
    );

}

export default FirstTimeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        marginBottom: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        // Font family not natively supported in React Native? Need to import custom fonts?
        // fontFamily: 'Arial',
    },
    text: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
        paddingHorizontal: 50,
    }
});