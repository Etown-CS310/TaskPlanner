import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useTheme } from '../hooks/useTheme';
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';

function UserInfoScreen() {
    // Navigation and State Variables
    const { theme } = useTheme();
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = useState(null);

    // Dropdown data
    const data = [
        { label: 'Change Username', value: 'Username'},
        { label: 'Change Email', value: 'Email'},
        { label: 'Change Password', value: 'Password'},
    ];
    
    // Fetch current user info from Firestore
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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            {/* Back Arrow and Title Section */}
            <View style={[{ flexDirection: 'row', alignItems: 'center'}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} style={[styles.backArrow, { color: theme.colors.text }]} />
                </TouchableOpacity>
                <View style={[{ flexDirection: 'column', alignItems: 'left'}]}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Login</Text>
                </View>
            </View>

            {/* Current User Information Section */}
            <Text style={[styles.header, {marginTop: 25, marginLeft: '12.5%', color: theme.colors.text}]}>Current Information</Text>
            <View style={[styles.currentInfo,{marginTop: 5, padding: 11, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}>
                <Text style={{ color: theme.colors.text }}>Current Username: </Text>
                <Text style={{ color: theme.colors.text }}>{username}</Text>
            </View>
            <View style={[styles.currentInfo,{marginTop: 5, padding: 11, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}>
                <Text style={{ color: theme.colors.text }}>Current Email: </Text>
                <Text style={{ color: theme.colors.text }}>{email}</Text>
            </View>

            {/* 
                Form where user can update their username, email, and password
                5 Input fields:
                    1. Shown when nothing is selected from dropdown - Keeps it so there is always 3 fields
                    2. If Value is 'Password' - "Enter Current Password"
                    3. If Value is 'Username' or 'Email' - "Enter New {value}"
                    4. If Value is 'Username' or 'Email' - "Re-Enter New {value}"
                    5. If Value is 'Username' or 'Email' - "Enter Current Password"
                Update Button that updates the selected info
            
            */}
            <Text style={[styles.header, {marginTop: 25, marginLeft: '12.5%', color: theme.colors.text}]}>Update Information</Text>
            <View style={[styles.updateInfo,{marginTop: 5, padding: 11, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}>
                <Dropdown
                    style={[{ width: '100%', color: theme.colors.text }, styles.dropdown]}
                    itemTextStyle={{ color: theme.colors.text }}
                    containerStyle={{ backgroundColor: theme.colors.surface }}
                    data={data}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onChange={item => {setValue(item.value);}}
                />
                {(value === null) && (
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Enter Current ${value}` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />
                )}
                {(value === 'Password') && (
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Enter Current ${value}` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />
                )}
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Enter New ${value}` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Re-Enter New ${value}` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />
                {(value === 'Email' || value === 'Username') && (
                <InputField
                    style={styles.enterInfo}
                    value={value ? "" : ""}
                    title={value ? `Enter Current Password` : "Select an option from Dropdown"}
                    onChangeText={() => {}}
                />
                )}

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

export default UserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'left',
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
    },
    dropdown: {
        paddingHorizontal: 8,
        paddingVertical: 6,
    }
});