import { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, Button, Switch, Platform, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../hooks/useTheme';
import { useTaskForm } from '../../hooks/useTaskForm';
import { DatePickerButton } from '../UI/DatePickerButton';
import RepeatingModal from './RepeatingModal.js';
import useModalDimensions from '../../hooks/useModalDimensions';

function EditTaskModal({ visible, onClose, onSave, userId, task, onDelete }) {
    const { theme } = useTheme();
    const modalContentStyle = useModalDimensions();
    const [repeatingModalVisible, setRepeatingModalVisible] = useState(false);
    
    const {
      title,
      category,
      repeatable,
      dueDate,
      dueDateValue,
      repeatingData,
      setTitle,
      setCategory,
      setRepeatable,
      setDueDate,
      setDueDateValue,
      setRepeatingData,
      buildTaskObject,
      handleRepeatingDataChange,
    } = useTaskForm(task);

    const handleDelete = async () => {
        try {
            if (!onDelete) {
                console.error('No onDelete prop provided to EditTaskModal');
                return;
            }
            const success = await onDelete(task);
            if (success) {
                // Wait a tick to allow React state update to flush before closing modal
                await new Promise(resolve => setTimeout(resolve, 50));
                onClose();
            } else {
                console.error('Task deletion failed (onDelete returned false)');
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleSave = () => {
      const updatedTask = buildTaskObject(userId, task.id);
      onSave(updatedTask);
      onClose();
    };

    return (
        <>
            <Modal
                isVisible={visible} 
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={onClose}
                onBackButtonPress={onClose}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                >
            <View style={[styles.modalContent, modalContentStyle, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Edit Task</Text>
            
                <View style={styles.section}>
                    <Text style={{ color: theme.colors.text }}>Current Title: </Text>
                    <TextInput style={[styles.input, {color: title === "" ? theme.colors.textSecondary : theme.colors.text, backgroundColor: theme.colors.surface}]}
                        placeholder="Enter New Title"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={{ color: theme.colors.text }}>Current Category: </Text>
                    <TextInput style={[styles.input, {color: title === "" ? theme.colors.textSecondary : theme.colors.text, backgroundColor: theme.colors.surface}]}
                        placeholder="Enter New Category"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={category}
                        onChangeText={setCategory}
                    />
                </View>

                <View style={styles.switchRowTight}>
                    <Text style={{ color: theme.colors.text }}>Due By</Text>
                    <Switch
                        value={dueDate}
                        onValueChange={setDueDate}
                    />
                </View>
                {dueDate && (
                  <DatePickerButton
                    value={dueDateValue}
                    onChange={setDueDateValue}
                    label="Select Due Date"
                  />
                )}

                <View style={styles.switchRowTight}>
                    <Text style={{ color: theme.colors.text }}>Repeatable</Text>
                    <Switch
                        value={repeatable}
                        onValueChange={setRepeatable}
                    />
                </View>
                {repeatable && (
                    <TouchableOpacity onPress={() => setRepeatingModalVisible(true)} style={[styles.repeatingButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                        <Text style={[styles.repeatingText, { color: theme.colors.text }]}>
                            {repeatingData?.type && repeatingData?.interval
                                ? `Repeats: ${repeatingData.interval} ${repeatingData.type}${parseInt(repeatingData.interval) > 1 ? 's' : ''}`
                                : 'Configure repeating'}
                        </Text>
                    </TouchableOpacity>
                )}

                <View style={styles.modalButtons}>
                    <Button
                            title="Delete Task"
                            onPress={handleDelete}
                            color="#d9534f"
                        />
                    <Button title="Close" onPress={onClose} color="#888"/>
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
            </Modal>
            <RepeatingModal
                visible={repeatingModalVisible}
                onClose={() => setRepeatingModalVisible(false)}
                onAdd={handleRepeatingDataChange}
            />
        </>
    )
}

export default EditTaskModal;

const styles = StyleSheet.create({
    modalContent: {
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
        marginTop: 50,
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
    input: {
        alignSelf: "flex-start",
        marginRight: '4px',
        marginLeft: '4px',
        paddingVertical: 2,
        fontWeight: 'bold',
    },
    dueDateInput: {
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize: 16,
    },
    repeatingText: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 8,
    },
    repeatingButton: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginVertical: 8,
        alignItems: 'center',
    },
});
