import { Text, TouchableOpacity, StyleSheet } from "react-native";

function AddTaskButton( {onPress} ) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{fontSize: 30, color: '#002b3d'}}>+</Text>
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