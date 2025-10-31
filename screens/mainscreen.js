import { useState } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";

import AddTaskButton from '../components/AddTaskButton.js';
import SearchBar from '../components/SearchBar.js';
import TaskItem from '../components/TaskItem.js';
import AddTaskModal from '../components/AddTaskModal';

    function MainScreen() {

    const [tasks, setTasks] = useState([]);

    const [isModalVisible, setModalVisible] = useState(false);

    const handleAddTask = (task) => {
        setTasks(prev => [...prev, task]);
    };

    const toggleTaskCompleted = (id) => {
    setTasks(prevTasks =>
        prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
        ))};

    return (
        <View style={styles.container}>
            <SearchBar/>

            <ScrollView contentContainerStyle={styles.taskList}>
                {tasks.map(task => (
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
});