import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, title, onChangeText }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={title}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default InputField;

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