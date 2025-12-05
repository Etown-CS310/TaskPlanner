import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../firebaseConfig";
import { collection, doc, updateDoc, getDocs, addDoc, deleteDoc, Timestamp, getDoc, query, where } from "firebase/firestore";

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
                    // If there are any locally-created tasks (numeric ids) for this user,
                    // migrate them to Firestore so doc IDs match and future operations
                    // (update/delete) target the correct documents.
                    try {
                        const storedTasks = await AsyncStorage.getItem('tasks');
                        if (storedTasks) {
                            const parsed = JSON.parse(storedTasks);
                            const localUserTasks = parsed.filter(t => t.userId === userId && /^\d+$/.test(t.id));
                            if (localUserTasks.length > 0) {
                                for (const lt of localUserTasks) {
                                    const docRef = await addDoc(collection(db, "tasks"), {
                                        ...lt,
                                        userId: userId || 'defaultUser',
                                        completed: lt.completed || false,
                                        createdAt: lt.createdAt ? new Date(lt.createdAt) : new Date(),
                                        repeating: lt.repeating ? {
                                            ...lt.repeating,
                                            startDate: lt.repeating.startDate ? Timestamp.fromDate(new Date(lt.repeating.startDate)) : null,
                                            endDate: lt.repeating.endDate ? Timestamp.fromDate(new Date(lt.repeating.endDate)) : null,
                                        } : null,
                                    });
                                }
                                // Remove migrated tasks from local storage
                                const remaining = parsed.filter(t => !(t.userId === userId && /^\d+$/.test(t.id)));
                                await AsyncStorage.setItem('tasks', JSON.stringify(remaining));
                            }
                        }
                    } catch (migrationErr) {
                        console.error('Error migrating local tasks to Firestore:', migrationErr);
                    }

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

const handleDeleteTask = async (taskToDelete) => {
    if (!taskToDelete || !taskToDelete.id) {
        console.error("handleDeleteTask called without task id", taskToDelete);
        return false;
    }

    if (storageMethod === 'local') {
        try {
            const updatedTasks = tasks.filter(t => t.id !== taskToDelete.id);
            setTasks(updatedTasks);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return true;
        } catch (error) {
            console.error("Error deleting task in local storage:", error);
            return false;
        }
    } else {
        try {
            const taskRef = doc(db, "tasks", taskToDelete.id);
            // Check whether a document with this id exists in Firestore
            const snap = await getDoc(taskRef);

            if (snap.exists()) {
                await deleteDoc(taskRef);
                const updatedTasks = tasks.filter(t => t.id !== taskToDelete.id);
                setTasks(updatedTasks);
                return true;
            }

            // If doc with that id doesn't exist, attempt to find matching documents
            const userKey = taskToDelete.userId || userId || 'defaultUser';
            const q = query(collection(db, "tasks"), where("userId", "==", userKey), where("title", "==", taskToDelete.title || ""));
            const qsnap = await getDocs(q);
            
            if (qsnap.empty) {
                console.warn("No matching Firestore documents found for task; nothing deleted", taskToDelete.id);
                return false;
            }

            const deletedIds = [];
            for (const d of qsnap.docs) {
                try {
                    await deleteDoc(doc(db, "tasks", d.id));
                    deletedIds.push(d.id);
                } catch (delErr) {
                    console.error("Failed to delete matched doc", d.id, delErr);
                }
            }

            if (deletedIds.length > 0) {
                // Remove the local task by its original id (not the Firestore doc id)
                const updatedTasks = tasks.filter(t => t.id !== taskToDelete.id);
                setTasks(updatedTasks);
                return true;
            }

            console.warn("Lookup found documents but none deleted", taskToDelete.id);
            return false;
        } catch (error) {
            console.error("Error deleting task in Firestore:", error);
            return false;
        }
    }
}

    return { tasks, handleAddTask, handleDeleteTask, handleSaveTask, toggleTaskCompleted, setTasks, storageMethod };    
}