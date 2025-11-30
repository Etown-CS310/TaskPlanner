import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
                   
function LabeledInput({ value, dateType, placeholder, onChange }) {

        const [date, setDate] = useState(new Date());
        const [showDatePicker, setShowDatePicker] = useState(false);

        const dateChangeHandler = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShowDatePicker(false);
            onChange(currentDate.toLocaleDateString());
        };

    return(
        <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: '12px'}]} >
            <TouchableOpacity onPress={() => setShowDatePicker(true)}> 
                <Text>{dateType}</Text>
                <Text style={styles.inputText}>{(value || placeholder)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display="default"
                    value={date}
                    onChange={dateChangeHandler}
                />
            )}
        </View>
    )
}

export default LabeledInput;

const styles = StyleSheet.create({
    inputText: {
        fontWeight: 'bold',
    }

});