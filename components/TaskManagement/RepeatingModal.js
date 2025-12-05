import { useState } from 'react';
import Modal from 'react-native-modal';
import {View, Text, TextInput, Button, TouchableOpacity, Platform, useWindowDimensions, StyleSheet} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import LabeledInput from '../UI/LabeledInput';
import useModalDimensions from '../../hooks/useModalDimensions';

function RepeatingModal({visible, onClose, onAdd, onToggle}){

    const { theme } = useTheme();
    const modalContentStyle = useModalDimensions();
    const [repeating, setRepeating] = useState({
        type: 'Do Not Repeat', // Do Not, Daily, Weekly, Monthly, Annually
        interval: '', // Repeats every 'x' days/weeks/months/years
        startDate: '', // Day Task starts to repeat on
        endDate: '', // 'x' in "On 'x' Date"
    });
    
    const handleAdd = () => {
        const validStartDate = repeating.startDate ? new Date(repeating.startDate) : new Date();
        const startDate = isNaN(validStartDate.getTime()) ? today : validStartDate;
        const validEndDate = repeating.endDate ? new Date(repeating.endDate) : null;
        const endDate = validEndDate && !isNaN(validEndDate.getTime()) ? validEndDate : null;

        const newRepeating = {
            repeatEvery: repeating.interval || null,
            interval: repeating.type || null,
            startDate,
            endDate,
        };
        onAdd(newRepeating);
        setRepeating({
            interval: '',
            type: 'Do Not Repeat',
            startDate: '',
            endDate: '',
        });
        onClose();
    }
    
    return (
        <Modal
            isVisible={visible} 
            animationIn="fadeIn"
            animationOut="fadeOut" 
            backdropOpacity={0.5}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            style={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={[styles.modalContent, modalContentStyle, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Task</Text>


    {/* Options to select for how frequently the task repeats */}
        <Text style={[styles.subheader, { color: theme.colors.text }]}>Frequency</Text>
        <View style={[styles.boxOutline, { borderColor: theme.colors.border }]}>
        {['Do Not Repeat', 'Day', 'Week', 'Month', 'Year'].map(option => (
            <View style={styles.option} key={option}>
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setRepeating(prev => ({ ...prev, type: option }))}
            >
                <View style={[styles.selectOption, { borderColor: theme.colors.text }]}>
                {repeating.type === option && <View style={[styles.innerCircle, { backgroundColor: theme.colors.text }]} />}
                </View>
                <Text style={[styles.optionText, { color: theme.colors.text }]}>{option}</Text>
            </TouchableOpacity>
            </View>
        ))}
        </View>

                
    {/* Popup for getting more details about the Interval, Start Date, and End Date*/}  
        {repeating.type && repeating.type !== 'Do Not Repeat' && (
        <View>
        <Text style={[styles.subheader, { color: theme.colors.text }]}>Interval</Text>
            <View style={[styles.boxOutline, { borderColor: theme.colors.border }]}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: '12px'}]} >
                <Text style={{ color: theme.colors.text }}>Repeats Every: </Text>
                <TextInput
                    style={[styles.input, {
                       flex: '1px',
                        color: repeating.interval === "" ? theme.colors.textSecondary : theme.colors.text,
                        backgroundColor: theme.colors.surface,
                    }]}
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="numeric"
                    value={repeating.interval}
                    onChangeText={ (val) => {
                        const numericVal = val.replace(/[^0-9]/g, '');
                        setRepeating(prev => ({ ...prev, interval: numericVal }))
                    }}
                    placeholder="x"
                />
                <Text style={{ color: theme.colors.text }}>{(() => {
                    switch (repeating.type) {
                    case 'Day':
                        return repeating.interval === '1' ? 'day' : 'days';
                    case 'Week':
                        return repeating.interval === '1' ? 'week' : 'weeks';
                    case 'Month':
                        return repeating.interval === '1' ? 'month' : 'months';
                    case 'Year':
                        return repeating.interval === '1' ? 'year' : 'years';
                    default:
                        return '';
                    }
                    })()}
                </Text>
            </View>
                <LabeledInput 
                    value={repeating.startDate}
                    dateType={`Starts On: `}
                    placeholder= {new Date().toLocaleDateString()}
                    onChange={(val) => {
                         setRepeating(prev => ({ ...prev, startDate: val }))
                    }}
                />
                <LabeledInput
                    value={repeating.endDate}
                    dateType={`Ends On: `}
                    placeholder="(Leave empty if no end date)"
                    onChange={(val) => {
                        setRepeating(prev => ({ ...prev, endDate: val }))
                    }}
                />

            </View>
        </View>
        )}

                <View style={styles.modalButtons}>
                    <Button title="Close" onPress={onClose} />
                    <Button title="Add" onPress={handleAdd} />
                </View>
            </View>
        </Modal>
    )
}

export default RepeatingModal;

const styles = StyleSheet.create({
    modalContent: {
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: Platform.OS === 'web' ? 22 : 18,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    subheader: {
        fontWeight: 'bold',
        marginTop: '8px',
        marginBottom: '8px',
    },
    boxOutline: {
        borderWidth: 2,
        borderRadius: '15px',
        padding: '8px',
        marginLeft: '4px',
    },
    selectOption: {
        width: 12,
        height: 12,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
    },
    innerCircle: {
        width: 8,
        height: 8,
        borderRadius: 5,
    },
    input: {
        marginRight: '4px',
        marginLeft: '4px',
        fontWeight: 'bold',
    }
});