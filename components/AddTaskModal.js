import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         Button,
         Switch,
         Platform,
         useWindowDimensions,
         StyleSheet } from 'react-native';

import RepeatingModal from './RepeatingModal.js';

function AddTaskModal({ visible, onClose, onAdd }) {

  const { width, height } = useWindowDimensions();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [repeatable, setRepeatable] = useState(false);
  const [dueDate, setDueDate] = useState(false);
  const [dueDateValue, setDueDateValue] = useState('');

  const [RepeatingModalVisible, setRepeatingModalVisible] = useState(false);

    const handleAdd = () => {
        const newTask = {
            id: Date.now(),
            title: title || 'Untitled Task',
            completed: false,
            category: category,
            repeating: repeatable ? 'Repeats weekly' : null,
            dueBy: dueDate ? `Due by: ${dueDateValue}` : null,
        };
        onAdd(newTask);
        setTitle('');
        setCategory('');
        setRepeatable(false);
        setDueDate(false);
        onClose();
    }

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

         <Text style={styles.modalTitle}>Add Task</Text>
          <TextInput style={[styles.input, {color: title === "" ? "#ccc" : "#000"}]}
           placeholder="Task Title"
           value={title}
           onChangeText={setTitle}
         />

         <TextInput style={[styles.input, {color: category === "" ? "#ccc" : "#000"}]}
           placeholder="Category"
           value={category}
           onChangeText={setCategory}
         />

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
               placeholder={`Enter Due Date (In ${new Date().toLocaleDateString()} format)`}
               onChangeText={setDueDateValue}
               />
         )}

         <View style={styles.switchRow}>
           <Text>Repeatable</Text>
           <TouchableOpacity
             onPress={() => setRepeatingModalVisible(true)}
             style={styles.arrowButton}
           >
             <Text style={styles.arrowText}>→</Text>
           </TouchableOpacity>
         </View>

         <View style={styles.modalButtons}>
           <Button title="Cancel" onPress={onClose} color="#888" />
           <Button title="Add" onPress={handleAdd} />
         </View>

         <RepeatingModal
            visible={RepeatingModalVisible}
            onClose={() => setRepeatingModalVisible(false)}
            onAdd={(data) => console.log(data)}
        />

      </View>
    </Modal>
    );
  }

export default AddTaskModal;

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
    borderColor: '#ccc',
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
    color: 'black',
  },
});