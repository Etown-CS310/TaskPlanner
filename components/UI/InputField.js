import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, title, onChangeText, style }) => {
  return (
    <TextInput
      style={[styles.textInput, style, {color: value === "" ? "#ccc" : "#000"}]}
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