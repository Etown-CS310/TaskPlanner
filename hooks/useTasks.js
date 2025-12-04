import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../firebaseConfig";
import { collection, doc, updateDoc, getDocs, addDoc, Timestamp } from "firebase/firestore";

export const useTasks = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [storageMethod, setStorageMethod] = useState(null);

    // Fetch Tasks from Local Storage or Firestore
    useEffect(() => {
        const initialize = async () => {
            const choice = await AsyncStorage.getItem('userChoice');
            setStorageMethod(choice);
            if (!userId) return; 
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
                    .map(doc => {
                        const data = doc.data();
                        return {
                        id: doc.id,
                        ...data,
                        repeating: data.repeating ? {
                            ...data.repeating,
                            startDate: data.repeating.startDate?.toDate
                                ? data.repeating.startDate.toDate() : new Date(data.repeating.startDate),
                            endDate: data.repeating.endDate?.toDate 
                                ? data.repeating.endDate.toDate() : data.repeating.endDate ? new Date(data.repeating.endDate) : null,
                        } : null
                        };
                    })
                    .filter(task => task.userId === userId);
                    setTasks(tasksData);
                } catch (error) {
                    console.error("Error loading tasks: ", error);
                }
            }
        };
        await fetchTasks(choice, userId);
        };
        initialize();
    }, [userId]);

    // Handler for adding a new task
    // Decides storage method based on user choice
    const handleAddTask = async (task) => {
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
                    repeating: task.repeating ? {
                    ...task.repeating,
                    startDate: task.repeating.startDate ? Timestamp.fromDate(new Date(task.repeating.startDate)) : null,
                    endDate: task.repeating.endDate ? Timestamp.fromDate(new Date(task.repeating.endDate)) : null,
                    } : null,
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

    const handleSaveTask = async (updatedTask) => {
        const newTasks = tasks.map(t =>
            t.id === updatedTask.id ? updatedTask : t
        );
        setTasks(newTasks);

    if (storageMethod === 'local') {
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } else {
        try {
            const taskRef = doc(db, "tasks", updatedTask.id);
            await updateDoc(taskRef, {
                ...updatedTask,
                repeating: updatedTask.repeating ? {
                    ...updatedTask.repeating,
                    startDate: updatedTask.repeating.startDate
                        ? Timestamp.fromDate(new Date(updatedTask.repeating.startDate)): null,
                    endDate: updatedTask.repeating.endDate
                        ? Timestamp.fromDate(new Date(updatedTask.repeating.endDate)): null,
                } : null,
            });
        } catch (err) {
            console.error("Error updating task in Firestore:", err);
        }
    }
};

    return { tasks, handleAddTask, handleSaveTask, toggleTaskCompleted, setTasks, storageMethod };    
}