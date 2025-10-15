import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native';

function AddTaskModal({ visible, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [repeatable, setRepeatable] = useState(false);
  const [dueDate, setDueDate] = useState(false);

    const handleAdd = () => {
        const newTask = {
            id: Date.now(),
            title: title || 'Untitled Task',
            completed: false,
            category: category,
            repeating: repeatable ? 'Repeats weekly' : null,
            dueBy: dueDate ? 'Due by: ' : null,
        };
        onAdd(newTask);
        setTitle('');
        setCategory('');
        setRepeatable(false);
        setDueDate(false);
        onClose();
    }
    return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Task</Text>

          <TextInput
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />

          <View style={styles.switchRowTight}>
            <Text>Due By</Text>
            <Switch
              value={dueDate}
              onValueChange={setDueDate}
            />
          </View>

          <View style={styles.switchRow}>
            <Text>Repeatable</Text>
            <Switch
              value={repeatable}
              onValueChange={setRepeatable}
            />
          </View>

          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={onClose} color="#888" />
            <Button title="Add" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </Modal>
    );
  }

export default AddTaskModal;

const styles = StyleSheet.create({
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
    marginBottom:-10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});