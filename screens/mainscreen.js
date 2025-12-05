import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../hooks/useTheme';
import { useNotifications } from '../hooks/useNotifications';
import { useSortAndFilter } from '../hooks/useSortAndFilter';
import AddTaskButton from '../components/TaskManagement/AddTaskButton';
import AddTaskModal from '../components/TaskManagement/AddTaskModal';
import TaskItem from '../components/TaskManagement/TaskItem';
import SearchBar from '../components/SearchBar';
import EditTaskModal from '../components/TaskManagement/EditTaskModal';
import { loadUserId, resetAppPreferences } from '../util/appUtil';

function MainScreen() {
    // Navigation and State Variables
    const { theme } = useTheme();
    const [userId, setUserId] = useState(null);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigation = useNavigation();

    const { tasks, handleAddTask, handleDeleteTask, handleSaveTask, toggleTaskCompleted } = useTasks(userId);
    useNotifications(tasks);
    
    const {
      sortCriteria,
      searchQuery,
      setSearchQuery,
      handleSortToggle,
      filteredTasks,
    } = useSortAndFilter(tasks);

    useEffect(() => {
        const initializeUserId = async () => {
            const userId = await loadUserId();
            setUserId(userId);
        };
        initializeUserId();
    }, []);

    const handleResetDemo = async () => {
        await resetAppPreferences();
        navigation.navigate('FirstTime');
    };

    return (
        
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <SearchBar onSearchChange={setSearchQuery} />
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} onPress={handleSortToggle}>
                <Text style={[styles.buttonText, { color: theme.colors.text }]}>{`Sort By: ${sortCriteria}`}</Text>
            </TouchableOpacity>

            {/* Temp for Testing Purposes */}
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} onPress={handleResetDemo}>
                <Text style={[styles.buttonText, { color: theme.colors.text }]}>Reset Option for Demo</Text>
            </TouchableOpacity>
            {/* Temp for Testing Purposes */}

            <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings-outline" size={24} color={theme.colors.text}/>
            </TouchableOpacity>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.taskList}
            >
                {filteredTasks.map(task => (
                <TaskItem
                    key={task.id}
                    title={task.title}
                    completed={task.completed}
                    category={task.category}
                    repeating={task.repeating}
                    dueBy={task.dueBy}
                    onToggle={() => toggleTaskCompleted(task.id)}
                    onEdit={() => {
                        setSelectedTask(task);
                        setEditModalVisible(true);
                    }}
                />
                ))}
            </ScrollView>

            <EditTaskModal
                visible={isEditModalVisible}
                onSave = {handleSaveTask}
                task = {selectedTask}
                onClose={() => setEditModalVisible(false)}
                userId={userId}
                onDelete={handleDeleteTask}
            />
            
            <AddTaskButton onPress={() => setAddModalVisible(true)} />

            <AddTaskModal
                visible={isAddModalVisible}
                onClose={() => setAddModalVisible(false)}
                onAdd={handleAddTask}
                userId={userId}
            />
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    taskList: {
        paddingTop: 20,
        paddingBottom: 100,
    },
    button: {
        marginBottom: 10,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
    },
    settingButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 10,
    },
});