import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import AddTaskButton from '../components/TaskManagement/AddTaskButton';
import AddTaskModal from '../components/TaskManagement/AddTaskModal';
import TaskItem from '../components/TaskManagement/TaskItem';
import SearchBar from '../components/SearchBar';

function MainScreen() {
    const [tasks, setTasks] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();

    const fetchUserId = async () => {
        try {
            return await AsyncStorage.getItem('userId');
        } catch (error) {
            console.error("Error fetching user ID: ", error);
            return null;
        }
    }; 

    const fetchTasks = async (storageMethod, userId) => {
        if (storageMethod === 'local') {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    const filteredTasks = JSON.parse(storedTasks).filter(task => task.userId === userId);
                    setTasks(filteredTasks);
                }
            } catch (error) {
                console.error("Error loading tasks from AsyncStorage: ", error);
            }
        } else {
            try {
                const snapshot = await getDocs(collection(db, "tasks"));
                const tasksData = snapshot.docs
                .map((doc) => ({id: doc.id,...doc.data() }))
                .filter(task => task.userId === userId);
                setTasks(tasksData);
            } catch (error) {
                console.error("Error loading tasks: ", error);
            }
        }
    };

    useEffect(() => {
        const loadUserId = async () => {
            const fetchedUserId = await fetchUserId();
            setUserId(fetchedUserId);
        };
        loadUserId();
    }, []);


    useEffect(() => {
        const loadTasks = async () => {
            if (userId) {
                await fetchTasks('cloud', userId);
            }};
        loadTasks();
    }, [userId]);

  const handleAddTask = async (task) => {
    const storageMethod = await fetchUserId();
    if (storageMethod === 'local') {
        const newTasks = [...tasks, { id: Date.now().toString(), ...task, userId: 
                        userId || 'defaultUser', completed: false }];
        setTasks(newTasks);
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } else {
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                ...task,
                userId: userId || 'defaultUser',
                completed: false,
                createdAt: new Date(),
                });
            setTasks((prev) => [...prev, { id: docRef.id, ...task, 
                userId: userId || 'defaultUser', completed: false }]);
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