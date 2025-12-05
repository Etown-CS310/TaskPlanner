import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

function AddTaskButton( {onPress} ) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[styles.button, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]} onPress={onPress}>
        <Text style={{fontSize: 30, color: theme.colors.text}}>+</Text>
    </TouchableOpacity>
  );
}

export default AddTaskButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 70,
    right: 35,
    width: 55,
    height: 55,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#002b3d',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});