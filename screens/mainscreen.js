import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTasks } from '../hooks/useTasks';
import { getNextSortCriteria, sortTasks } from '../util/taskUtil';
import AddTaskButton from '../components/TaskManagement/AddTaskButton';
import AddTaskModal from '../components/TaskManagement/AddTaskModal';
import TaskItem from '../components/TaskManagement/TaskItem';
import SearchBar from '../components/SearchBar';
import EditTaskModal from '../components/TaskManagement/EditTaskModal';

function MainScreen() {
    // Navigation and State Variables
    const [userId, setUserId] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('');
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigation = useNavigation();

    const { tasks, handleAddTask, handleSaveTask, toggleTaskCompleted } = useTasks(userId);

    useEffect(() => {
        const loadUserId = async () => {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId || 'defaultUser');
        };
        loadUserId();
    }, []);


    const handleSortToggle = () => {
        setSortCriteria(prev => getNextSortCriteria(prev));
    };

    const sortedTasks = sortTasks(tasks, sortCriteria);



        // Temp for Testing Purposes
        const resetChoice = async () => {
        try {
            await AsyncStorage.removeItem('isFirstLaunch');
            await AsyncStorage.removeItem('userChoice');
            navigation.navigate('FirstTime');
        } catch (error) {
            console.error("Error resetting user choice: ", error);
        }
    };

    return (
        
        <View style={styles.container}>
            {/* 
                Search Bar to filter tasks by title
                Sort By Button - 'Completed', 'Category', 'Repeating', 'Due By'
                Settings Button (Top Right)
                Task List (ScrollView)
                Add Task Button and Modal
             */}
            <SearchBar/>
            <TouchableOpacity style={styles.button} onPress={handleSortToggle}>
                <Text style={styles.buttonText}>{`Sort By: ${sortCriteria}`}</Text>
            </TouchableOpacity>

            {/* Temp for Testing Purposes */}
            <TouchableOpacity style={styles.button} onPress={resetChoice}>
                <Text style={styles.buttonText}>Reset Option for Testing</Text>
            </TouchableOpacity>
            {/* Temp for Testing Purposes */}

            <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings-outline" size={24} color="black"/>
            </TouchableOpacity>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.taskList}
            >
                {sortedTasks.map(task => (
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
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    taskList: {
        paddingTop: 20,
        paddingBottom: 100,
    },
    button: {
        marginBottom: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000ff',
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