import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function TaskItem({ title, completed, category, repeating, onToggle }) {
  return (
    <View style= {styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, completed && styles.completed]}>
          {title}
        </Text>
        {repeating && <Text style={styles.meta}>{repeating}</Text>}
        {category && <Text style={styles.meta}>{category}</Text>}
      </View>

      <TouchableOpacity style={styles.editIcon}>
        <Text style={styles.editText}>✎</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 60,
    borderWidth: 2,
    borderColor: '#002b3d',
    borderRadius: 10,
    padding: 10,
    marginBottom: 25,
    backgroundColor: '#fff',
  },
  checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: '#000000ff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
  },
  checkmark: {
    color: 'green',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#555',
  },
  meta: {
    fontSize: 12,
    color: '#888',
  },
  editIcon: {
    marginLeft: 10,
  },
});
