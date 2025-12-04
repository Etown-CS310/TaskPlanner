import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function TaskItem({ title, completed, category, repeating, dueBy, onToggle, onEdit }) {
  const renderRepeating = () => {
    if(!repeating)
      return null;
    if(repeating.type === 'Do Not Repeat' || !repeating.interval)
      return null;

    const intervalLabel = repeating.interval?.toLowerCase() || '';
    const repeatEvery = parseInt(repeating.repeatEvery) || 1;
    const startDate = repeating.startDate ? new Date(repeating.startDate).toLocaleDateString() : null;
    const endDate = repeating.endDate ? new Date(repeating.endDate).toLocaleDateString() : null;

    const pluralize = repeatEvery === 1 ? intervalLabel : intervalLabel + 's';

    return (
      <Text style={styles.meta}>
        Repeats every {repeatEvery} {pluralize}
        {startDate ? ` from ${startDate}` : ''}
        {endDate ? ` to ${endDate}` : ''}
      </Text>
    );
  }

  return (
    <View style= {styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, completed && styles.completed]}>
          {title}
        </Text>
        <View style={styles.textContainer}>
              {renderRepeating()}
              {dueBy && <Text style={styles.meta}>{dueBy}</Text>}
              {category && <Text style={styles.meta}>{category}</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
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
    height: 100,
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
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
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
