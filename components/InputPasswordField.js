import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InputPasswordField = ({ value, title, onChangeText, showPassword, toggleShowPassword }) => {
  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={[styles.passwordInput, {color: value === "" ? "#ccc" : "#000"}]}
        placeholder={title}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#333"
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
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 12,
    backgroundColor: '#fff',
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