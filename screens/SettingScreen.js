import { useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, Switch, StyleSheet, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useNotifications } from '../hooks/useNotifications';
import { useStorageMethod } from '../hooks/useStorageMethod';
import { useNotificationPreference } from '../hooks/useNotificationPreference';
import { useLogout } from '../hooks/useLogout';

function SettingScreen() {
    const { theme, isDarkMode, toggleDarkMode } = useTheme();
    const navigation = useNavigation();
    const { storageMethod } = useStorageMethod();
    const { logout } = useLogout(storageMethod, navigation);
    const { updateNotificationPreference } = useNotifications();
    const {
      notifyDaysInAdvance,
      notifyDaysInput,
      handleNotifyDaysChange,
      saveNotifyDays,
    } = useNotificationPreference();

    const handleSaveNotifyDays = async () => {
      await saveNotifyDays(updateNotificationPreference);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[{ flexDirection: 'row', alignItems: 'center'}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} style={[styles.backArrow, { color: theme.colors.text }]} />
                </TouchableOpacity>
                <View style={[{ flexDirection: 'column', alignItems: 'left'}]}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
                    {storageMethod === 'local' && (
                    <Text style={[styles.saveType, { color: theme.colors.textSecondary }]}>Local Save</Text>
                    )}
                    {storageMethod === 'cloud' && (
                        <Text style={{ color: theme.colors.textSecondary }}>Cloud Save</Text>
                    )}
                    {!storageMethod && (
                        <Text style={[styles.saveType, { color: theme.colors.textSecondary }]}>Not logged in</Text>
                    )}
                </View>
            </View>
                
            <Text style={[styles.header, {marginTop: 25, marginLeft: '12.5%', color: theme.colors.text}]}>User Settings</Text>

            <View style={[styles.settingSection,{marginTop: 5, padding: 11, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}>
                <Text style={{ color: theme.colors.text }}>Login</Text>
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

            <View style={[styles.notificationSettingsSection, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Notify (days in advance):</Text>
                <View style={styles.notifyInputRow}>
                    <TextInput
                        style={[styles.notifyInput, { color: theme.colors.text, backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
                        keyboardType="numeric"
                        value={notifyDaysInput}
                        onChangeText={handleNotifyDaysChange}
                        maxLength={2}
                        placeholder="3"
                        placeholderTextColor={theme.colors.textSecondary}
                    />
                    <TouchableOpacity 
                        style={[styles.saveButton, { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border }]} 
                        onPress={handleSaveNotifyDays}
                    >
                        <Text style={[styles.saveButtonText, { color: theme.colors.text }]}>Save</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                    You'll be notified {notifyDaysInAdvance} days before a task is due
                </Text>
            </View>

            <View style={[styles.settingSection,{marginTop: 5, padding: 0.5, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}>
                <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
                <Switch onValueChange={toggleDarkMode} value={isDarkMode}/>
            </View>

            <View style={[styles.settingSection, {marginTop: 20, padding: 11, backgroundColor: isDarkMode ? '#3a2a2a' : '#f2f2f2', borderColor: '#ccc', borderWidth: 1, borderRadius: 10}]}>
                <Text style={{ fontSize: 16, color: 'red' }}>Logout</Text>
                <TouchableOpacity onPress={logout}>
                    <Ionicons name="log-out-outline" size={24} color="red" />
                </TouchableOpacity>
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
    notificationSettingsSection: {
        alignSelf: 'center',
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginTop: 5,
    },
    settingLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    notifyInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    notifyInput: {
        flex: 0.4,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    saveButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontWeight: '600',
        fontSize: 12,
    },
    settingDescription: {
        fontSize: 12,
        fontStyle: 'italic',
    },
});