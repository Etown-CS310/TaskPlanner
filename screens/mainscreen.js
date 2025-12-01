import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db } from "../API/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import AddTaskButton from '../components/TaskManagement/AddTaskButton';
import AddTaskModal from '../components/TaskManagement/AddTaskModal';
import TaskItem from '../components/TaskManagement/TaskItem';
import SearchBar from '../components/SearchBar';


function MainScreen() {
    const [tasks, setTasks] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    const navigation = useNavigation();

    const fetchUserChoice = async () => {
        try {
            return await AsyncStorage.getItem('userChoice');
        } catch (error) {
            console.error("Error fetching user choice: ", error);
            return null;
        }
    }; 

    const fetchTasks = async (storageMethod) => {
        if (storageMethod === 'local') {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                }
            } catch (error) {
                console.error("Error loading tasks from AsyncStorage: ", error);
            }
        } else {
            try {
                const snapshot = await getDocs(collection(db, "tasks"));
                const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setTasks(tasksData);
            } catch (error) {
                console.error("Error loading tasks: ", error);
            }
        }
    };

    useEffect(() => {
        const loadTasks = async () => {
            const userChoice = await fetchUserChoice();
            if (userChoice)
                fetchTasks(userChoice); 
        };
        loadTasks();
    }, []);


  const handleAddTask = async (task) => {
    const storageMethod = await fetchUserChoice();
    if (storageMethod === 'local') {
        const newTasks = [...tasks, { id: Date.now().toString(), ...task, completed: false }];
        setTasks(newTasks);
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } else {
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                ...task,
                completed: false,
                createdAt: new Date(),
                });
            setTasks((prev) => [...prev, { id: docRef.id, ...task, completed: false }]);
    } catch (error) {
        console.error("Error adding task: ", error);
        }
    }};

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
            default:
                return 'Completed';
            }
        });
    };




        // Temp for Demonstration Purposes
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