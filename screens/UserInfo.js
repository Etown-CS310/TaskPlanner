import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';

function UserInfo() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = useState(null);

    const data = [
        { label: 'Change Username', value: 'Username'},
        { label: 'Change Email', value: 'Email'},
        { label: 'Change Password', value: 'Password'},
    ];
    

    const fetchUserInfo = async () => {
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const currentUser = users.find(user => user.userId === auth.currentUser?.uid);
            setUsername(currentUser?.username ?? "Unknown User");
            setEmail(currentUser?.email ?? "No Email Found");                       
        } catch (error) {
            console.error("Error fetching username: ", error);
            return null;
        }   
    };

    useEffect(() => {
        fetchUserInfo();
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

            <Text style={[styles.header, {marginTop: 25, marginLeft: '12.5%'}]}>Current Information</Text>
            <View style={[styles.currentInfo,{marginTop: 5, padding: 11}]}>
                <Text>Current Username: </Text>
                <Text>{username}</Text>
            </View>
            <View style={[styles.currentInfo,{marginTop: 5, padding: 11}]}>
                <Text>Current Email: </Text>
                <Text>{email}</Text>
            </View>
            <Text style={[styles.header, {marginTop: 25, marginLeft: '12.5%'}]}>Update Information</Text>
            <View style={[styles.updateInfo,{marginTop: 5, padding: 11}]}>
                <Dropdown
                    style={{ width: '100%' }}
                    data={data}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onChange={item => {setValue(item.value);}}
                />
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Enter Current ${value}` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Enter New ${value}` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Re-Enter Current ${value}` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />

                <Button 
                    style={styles.updateButton}
                    textStyle={{ color: 'black' }}
                    title={value ? `Update ${value}` : "Update Info"}
                    onPress={() => {}}
                />
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
    currentInfo: {
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
    updateInfo: {
        flexDirection: 'column',
        alignItems: 'left',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    enterInfo: {
        width: '85%',
        marginTop: 15,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: 'black',
    },
    updateButton: {
        marginTop: 15,
        alignSelf: 'center',
        backgroundColor: '#ccc',
        width: '50%',
    }
});