import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, Switch, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

function SettingScreen() {
    const [storageMethod, setStorageMethod] = useState(null);
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const fetchUserChoice = async () => {
        try {
            const choice = await AsyncStorage.getItem('userChoice');
            setStorageMethod(choice);
        } catch (error) {
            console.error("Error fetching user choice: ", error);
        }
    };
    useEffect(() => {
        fetchUserChoice();
    }, []);

    return (
        <View style={styles.container}>
            <View style={[{ flexDirection: 'row', alignItems: 'center'}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} style={styles.backArrow} />
                </TouchableOpacity>
                <View style={[{ flexDirection: 'column', alignItems: 'left'}]}>
                    <Text style={styles.title}>Settings</Text>
                    {storageMethod === 'local' && (
                    <Text style={styles.saveType}>Local Save</Text>
                    )}
                    {storageMethod === 'cloud' && (
                        <Text>Cloud Save</Text>
                    )}
                </View>
            </View>
                
            <Text style={[styles.header, {marginTop: 25, marginLeft: '12.5%'}]}>User Settings</Text>

            <View style={[styles.settingSection,{marginTop: 5, padding: 11}]}>
                <Text>Login</Text>
                {storageMethod === 'local' && (
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Ionicons name="chevron-forward-outline" size={24} />
                    </TouchableOpacity>
                )}
                {storageMethod === 'cloud' && (
                    <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
                        <Ionicons name="chevron-forward-outline" size={24} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={[styles.settingSection,{marginTop: 5, padding: 11.5}]}>
                <Text>Notifications</Text>
                <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}> 
                    <Ionicons name="chevron-forward-outline" size={24} />
                </TouchableOpacity>
            </View>

            <View style={[styles.settingSection,{marginTop: 5, padding: 0.5}]}>
                <Text>Dark Mode</Text>
                <Switch onValueChange={toggleSwitch} value={isEnabled}/>
            </View>
        </View>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'left',
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 25,
    },
    header: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    backArrow: {
        marginTop: 25,
        marginLeft: 25,
        color: 'black',
    },
    saveType: {
        marginLeft: 0,
        marginTop: 0,
        fontSize: 10,
    },
    settingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
});