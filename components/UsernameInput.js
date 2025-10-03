import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const UsernameInput = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder='Enter Username'
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default UsernameInput;

const styles = StyleSheet.create({
  textInput: {
    width: '75%',
    padding: 12,
    marginVertical: 12,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 6,
    fontSize: 16,
    fontWeight: '400',
  },
});