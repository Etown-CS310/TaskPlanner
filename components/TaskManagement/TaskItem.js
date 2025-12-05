import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { formatDateForDisplay } from "../../util/dateUtil";

function TaskItem({ title, completed, category, repeating, dueBy, onToggle, onEdit }) {
  const { theme } = useTheme();
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
      <Text style={[styles.meta, { color: theme.colors.text }] }>
        Repeats every {repeatEvery} {pluralize}
        {startDate ? ` from ${startDate}` : ''}
        {endDate ? ` to ${endDate}` : ''}
      </Text>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.text }, completed && styles.completed]}>
          {title}
        </Text>
        <View style={styles.textContainer}>
              {renderRepeating()}
              {dueBy && <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>Due By: {formatDateForDisplay(dueBy)}</Text>}
              {category && <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>{category}</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
        <Text style={[styles.editText, { color: theme.colors.text }]}>✎</Text>
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
    borderRadius: 10,
    padding: 10,
    marginBottom: 25,
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
  },
  editIcon: {
    marginLeft: 10,
  },
  editText: {
    fontSize: 16,
  },
});
