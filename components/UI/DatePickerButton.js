import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../hooks/useTheme';
import { formatDateForDisplay } from '../../util/dateUtil';

/**
 * DatePickerButton component that opens a date picker on press
 * @param {Date} value - Current date value
 * @param {Function} onChange - Callback when date is selected
 * @param {string} label - Label for the picker
 */
export function DatePickerButton({ value, onChange, label = 'Select Date' }) {
  const { theme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (selectedDate && event.type !== 'dismissed') {
      onChange(selectedDate);
    }
  };

  const dateDisplay = value ? formatDateForDisplay(value) : 'No date selected';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>{dateDisplay}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value instanceof Date ? value : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          onTouchCancel={() => setShowPicker(false)}
        />
      )}

      {Platform.OS === 'ios' && showPicker && (
        <View style={styles.iosPickerActions}>
          <TouchableOpacity onPress={() => setShowPicker(false)}>
            <Text style={[styles.iosActionText, { color: theme.colors.text }]}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  iosPickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  iosActionText: {
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 20,
  },
});
