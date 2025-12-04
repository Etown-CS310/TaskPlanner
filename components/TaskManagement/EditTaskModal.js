import { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, Switch, Platform, useWindowDimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

function EditTaskModal({ visible, onClose, onSave, task }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [repeatable, setRepeatable] = useState(false);
    const [dueDate, setDueDate] = useState(false);
    const [dueDateValue, setDueDateValue] = useState('');
    const [repeatingData, setRepeatingData] = useState(null);

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setCategory(task.category || '');
            setRepeatable(!!task.repeating);
            setDueDate(!!task.dueBy);
            setDueDateValue(task.dueBy || '');
            setRepeatingData(task.repeating || null);
        }
    }, [task]);

    const handleSave = () => {
    const updatedTask = {
        ...task,
        title,
        category,
        dueBy: dueDate ? dueDateValue : null,
        repeating: repeatable ? repeatingData : null,
    };

    onSave(updatedTask);
    onClose();
};

    const { width, height } = useWindowDimensions();
    const modalContentStyle = {
        width: Platform.OS === 'web' ? Math.min(450, width * 0.4) : width * 0.9,
        maxHeight: height * 0.9,
        padding: Platform.OS === 'web' ? 32 : 20,
    };  

    return (
        <Modal
            isVisible={visible} 
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            >
            <View style={[styles.modalContent, modalContentStyle]}>
                <Text style={styles.modalTitle}>Edit Task</Text>
            
                <View style={styles.section}>
                    <Text>Current Title: </Text>
                    <TextInput style={[styles.input, {color: title === "" ? "#ccc" : "#000"}]}
                        placeholder="Enter New Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.section}>
                    <Text>Current Category: </Text>
                    <TextInput style={[styles.input, {color: title === "" ? "#ccc" : "#000"}]}
                        placeholder="Enter New Category"
                        value={category}
                        onChangeText={setCategory}
                    />
                </View>

                <View style={styles.switchRowTight}>
                    <Text>Due By</Text>
                    <Switch
                        value={dueDate}
                        onValueChange={setDueDate}
                    />
                </View>
                {dueDate && (
                    <TextInput
                    style={[styles.dueDateInput, {color: dueDateValue === "" ? "#ccc" : "#000"}]}
                    placeholder={`Enter New Due Date (In ${new Date().toLocaleDateString()} format)`}
                    onChangeText={setDueDateValue}
                    />
                )}

                <View style={styles.modalButtons}>
                    <Button title="Close" onPress={onClose} color="#888"/>
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    )
}

export default EditTaskModal;

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: Platform.OS === 'web' ? 22 : 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchRowTight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
  },
    dueDateInput: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        fontSize: 16,
  },
    input: {
        alignSelf: "flex-start",
        marginRight: '4px',
        marginLeft: '4px',
        paddingVertical: 2,
        fontWeight: 'bold',
        textDecorationStyle: 'solid',
        borderBottomWidth: 2,
        color: '#363636ff',
    },
  dueDateInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    fontSize: 16,
  },
});
