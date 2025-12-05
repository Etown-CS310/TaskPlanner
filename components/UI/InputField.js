import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const InputField = ({ value, title, onChangeText, style }) => {
  const { theme } = useTheme();

  return (
    <TextInput
      style={[styles.textInput, style, {color: value === "" ? theme.colors.textSecondary : theme.colors.text, backgroundColor: theme.colors.surface, borderColor: theme.colors.border}]}
      placeholder={title}
      placeholderTextColor={theme.colors.textSecondary}
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
    borderRadius: 6,
    fontSize: 16,
    fontWeight: '400',
  },
});