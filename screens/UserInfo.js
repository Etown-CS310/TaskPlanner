import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, Switch, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function UserInfo() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            // TODO Fetch Username from API
        };

        fetchUsername();
    }, []);

    return (
        <View style={styles.container}>
            <View style={[{ flexDirection: 'row', alignItems: 'center'}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} style={styles.backArrow} />
                </TouchableOpacity>
                <View style={[{ flexDirection: 'column', alignItems: 'left'}]}>
                    <Text style={styles.title}>Login</Text>
                </View>
            </View>

            <Text style={[styles.header, {marginTop: 25, marginLeft: '12.5%'}]}>Username</Text>
            <View style={[styles.loginSection,{marginTop: 5, padding: 11}]}>
                <Text>Current Username: </Text>
                <Text>{username}</Text>
            </View>

            
        </View>
    )
}

export default UserInfo;

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
    loginSection: {
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