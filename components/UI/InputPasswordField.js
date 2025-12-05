import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

const InputPasswordField = ({ value, title, onChangeText, showPassword, toggleShowPassword }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.passwordContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <TextInput
        style={[styles.passwordInput, {color: value === "" ? theme.colors.textSecondary : theme.colors.text}]}
        placeholder={title}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={theme.colors.text}
          />
      </TouchableOpacity>
    </View>
  );
};

export default InputPasswordField;

const styles = StyleSheet.create({
  passwordContainer: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});