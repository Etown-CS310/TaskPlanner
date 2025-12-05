import { useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TextInput, TouchableOpacity, Button, Switch, Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useTaskForm } from '../../hooks/useTaskForm';
import { DatePickerButton } from '../UI/DatePickerButton';
import RepeatingModal from './RepeatingModal.js';
import useModalDimensions from '../../hooks/useModalDimensions';

function AddTaskModal({ visible, onClose, onAdd, userId }) {
  const { theme } = useTheme();
  const modalContentStyle = useModalDimensions();
  const [RepeatingModalVisible, setRepeatingModalVisible] = useState(false);
  
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
    resetForm,
    buildTaskObject,
    handleRepeatingDataChange,
  } = useTaskForm();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAdd = () => {
    const newTask = buildTaskObject(userId);
    onAdd(newTask);
    handleClose();
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
      <View style={[styles.modalContent, modalContentStyle, { backgroundColor: theme.colors.background }]}>

         <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Add Task</Text>
          <TextInput style={[styles.input, {color: title === "" ? theme.colors.textSecondary : theme.colors.text, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}
           placeholder="Task Title"
           placeholderTextColor={theme.colors.textSecondary}
           value={title}
           onChangeText={setTitle}
         />

         <TextInput style={[styles.input, {color: category === "" ? theme.colors.textSecondary : theme.colors.text, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}
           placeholder="Category"
           placeholderTextColor={theme.colors.textSecondary}
           value={category}
           onChangeText={setCategory}
         />

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

         <View style={styles.switchRow}>
           <Text style={{ color: theme.colors.text }}>Repeatable</Text>
           <TouchableOpacity
             onPress={() => setRepeatingModalVisible(true)}
             style={styles.arrowButton}
           >
             <Text style={[styles.arrowText, { color: theme.colors.text }]}>→</Text>
           </TouchableOpacity>
         </View>

         <View style={styles.modalButtons}>
           <Button title="Cancel" onPress={handleClose} color="#888" />
           <Button title="Add" onPress={handleAdd} />
         </View>

         <RepeatingModal
            visible={RepeatingModalVisible}
            onClose={() => setRepeatingModalVisible(false)}
            onAdd={handleRepeatingDataChange}
        />

      </View>
    </Modal>
  );
}

export default AddTaskModal;

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
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginVertical: 10,
    fontSize: 16,
  },
  arrowButton: {
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});