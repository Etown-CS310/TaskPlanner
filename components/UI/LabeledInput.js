import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../hooks/useTheme';

function LabeledInput({ value, dateType, placeholder, onChange }) {
    const { theme } = useTheme();

    const parseValueToDate = (val) => {
        if (!val) return null;
        if (val instanceof Date && !isNaN(val)) return val;

        if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
            const d = new Date(val);
            return isNaN(d) ? null : d;
        }

        return null;
    };

    const [internalDate, setInternalDate] = useState(parseValueToDate(value));
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Sync when parent value changes
    useEffect(() => {
        setInternalDate(parseValueToDate(value));
    }, [value]);

    const dateChangeHandler = (event, selectedDate) => {
        setShowDatePicker(false);

        if (selectedDate && !isNaN(selectedDate)) {
            setInternalDate(selectedDate);
            onChange(selectedDate);  // send a valid Date to parent
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={{ color: theme.colors.text }}>{dateType}</Text>
                    <Text style={[styles.inputText, { color: theme.colors.text }]}>
                        {internalDate
                            ? internalDate.toLocaleDateString()
                            : placeholder}
                    </Text>
                </View>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display="default"
                    // If null → default to today for the picker
                    value={internalDate || new Date()}
                    onChange={dateChangeHandler}
                />
            )}
        </View>
    );
}

export default LabeledInput;

const styles = StyleSheet.create({
    inputText: {
        fontWeight: 'bold',
    }
});
