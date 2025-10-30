import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {View,
        Text,
        TextInput,
        Button,
        TouchableOpacity,
        Platform,
        useWindowDimensions,
        StyleSheet} from 'react-native';

function RepeatingModal({visible, onClose, onAdd, onToggle}){

    const { width, height } = useWindowDimensions();

    const [repeating, setRepeating] = useState({
        interval: '',
        type: 'Do Not Repeat', // Do Not, Daily, Weekly, Monthly, Annually
        startDate: '', // Day Task starts to repeat on
        endType: 'Never', // Never, After 'x' Occurences, On 'x' Date
        endOccurence: '', // 'x' in " After 'x' Occurences"
        endDate: '', // 'x' in "On 'x' Date"
    });
    
    const handleAdd = () => {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);


        const newRepeating = {
            repeatEvery: repeating.interval || null,
            interval: repeating.type || null,
            startDate: repeating.startDate || today.toISOString(),
            endType: repeating.endType || null,
            endOccurence: repeating.endOccurence || null,
            endDate: repeating.endDate || nextMonth.toISOString(),
        };
        onAdd(newRepeating);
        setRepeating({
            interval: '',
            type: 'Do Not Repeat',
            startDate: '',
            endType: 'Never',
            endOccurence: '',
            endDate: '',
        });
        onClose();
    }
    

        const modalContentStyle = {
        width: Platform.OS === 'web' ? Math.min(450, width * 0.4) : width * 0.9,
        maxHeight: height * 0.9,
        padding: Platform.OS === 'web' ? 32 : 20,
        overflow: 'scroll',
    };
    

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
            <View style={[styles.modalContent, modalContentStyle,]}>
                <Text style={styles.modalTitle}>Task</Text>


    {/* Options to select for how frequently the task repeats */}
        <Text style={styles.subheader}>Frequency</Text>
        <View style={styles.boxOutline}>
        {['Do Not Repeat', 'Daily', 'Weekly', 'Monthly', 'Annually'].map(option => (
            <View style={styles.option} key={option}>
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setRepeating(prev => ({ ...prev, type: option }))}
            >
                <View style={styles.selectOption}>
                {repeating.type === option && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
            </View>
        ))}
        </View>

                
    {/* Popup for getting more details about the frequency and end date if any*/}  
        {repeating.type && repeating.type !== 'Do Not Repeat' && (
            <View>
            <Text style={styles.subheader}>Interval</Text>
                <View style={styles.boxOutline}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: '12px'}]} >
                        <Text>Repeats Every: </Text>
                        <TextInput
                            style={[styles.input, {
                                flex: '1px',
                                color: repeating.interval === "" ? "#ccc" : "#000"
                            }]}
                            keyboardType="numeric"
                            value={repeating.interval}
                            onChangeText={(val) => setRepeating(prev => ({ ...prev, interval: val }))}
                            placeholder="1"
                        />
                        <Text>{(() => {
                            switch (repeating.type) {
                            case 'Daily':
                                return repeating.interval === '1' ? 'Day' : 'Days';
                            case 'Weekly':
                                return repeating.interval === '1' ? 'Week' : 'Weeks';
                            case 'Monthly':
                                return repeating.interval === '1' ? 'Month' : 'Months';
                            case 'Annually':
                                return repeating.interval === '1' ? 'Year' : 'Years';
                            default:
                                return '';
                            }
                        })()}
                        </Text>
                    </View>
                    <Text>Starts On: </Text>
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
        backgroundColor: '#fff',
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
        borderColor: '#ccc',
        borderRadius: '15px',
        padding: '8px',
        marginLeft: '4px',
    },
    selectOption: {
        width: 12,
        height: 12,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#000',
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
    backgroundColor: '#000',
    },
    input: {
        marginRight: '4px',
        marginLeft: '4px',
        fontWeight: 'bold',
        color: '#363636ff',
    }
});