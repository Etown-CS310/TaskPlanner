import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";

// Temp for Demonstration Purposes
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import AddTaskButton from '../components/AddTaskButton.js';
import SearchBar from '../components/SearchBar.js';
import TaskItem from '../components/TaskItem.js';
import AddTaskModal from '../components/AddTaskModal';

function MainScreen() {
    const [tasks, setTasks] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');

    // Temp for Demonstration Purposes
        const navigation = useNavigation();
        const resetChoice = async () => {
        try {
            await AsyncStorage.removeItem('isFirstLaunch');
            await AsyncStorage.removeItem('userChoice');
            navigation.navigate('FirstTime');
        } catch (error) {
            console.error("Error resetting user choice: ", error);
        }
    };



    const handleAddTask = (task) => {
        setTasks(prev => [...prev, task]);
    };

    const toggleTaskCompleted = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const sortTasks = () => {
        const sortedTasks = [...tasks];

        return sortedTasks.sort((a, b) => {
        switch (sortCriteria) {
            case 'Completed':
                return Number(a.completed) - Number(b.completed);
            case 'Category':
                if (!a.category && !b.category) return 0;
                if (!a.category) return 1;
                if (!b.category) return -1;
                return a.category.localeCompare(b.category);
            case 'Repeating':
                const repeatA = a.repeating ? 0 : 1;
                const repeatB = b.repeating ? 0 : 1;
                return repeatA - repeatB;

            // Fix This to Bring them to top and sort cronologically

            //  case 'Due By':
            //     const dateA = new Date(a.dueBy);
            //     const dateB = new Date(b.dueBy);

            //     if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
            //     if (isNaN(dateA.getTime()))  return 1;
            //     if (isNaN(dateB.getTime())) return -1;

            //     return dateA - dateB;
            default:
                return tasks;
            }
        });
    };

    const handleSortToggle = () => {
        setSortCriteria(prev => {
            switch (prev) {
            case 'Completed':
                return 'Category';
            case 'Category':
                return 'Repeating';
            case 'Repeating':
                return 'Completed';     // Temp while figure out fix, will eventually be 'Due By'
                // return 'Due By';
            // case 'Due By':
            //    return 'Completed';
            default:
                return 'Completed';
            }
        });
    };

    return (
        <View style={styles.container}>
            <SearchBar/>
            <TouchableOpacity style={styles.button} onPress={handleSortToggle}>
                <Text style={styles.buttonText}>{`Sort By: ${sortCriteria}`}</Text>
            </TouchableOpacity>

            {/* Temp for Demonstration Purposes */}
            <TouchableOpacity style={styles.button} onPress={resetChoice}>
                <Text style={styles.buttonText}>Reset Option for Demo Purposes</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.taskList}>
                {sortTasks().map(task => (
                <TaskItem
                    key={task.id}
                    title={task.title}
                    completed={task.completed}
                    category={task.category}
                    repeating={task.repeating}
                    dueBy={task.dueBy}
                    onToggle={() => toggleTaskCompleted(task.id)}
                />
                ))}
            </ScrollView>
            
            <AddTaskButton onPress={() => setModalVisible(true)} />

            <AddTaskModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={handleAddTask}
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
        padding: 5,
        alignItems: 'center',
        width: '10%',
    },
    buttonText: {
        color: '#000000ff',
        fontSize: 10,
        textAlign: 'center',
    },
});