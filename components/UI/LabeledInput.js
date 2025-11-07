import { View, Text, TextInput, StyleSheet } from 'react-native';
                   
function LabeledInput({ label, value, placeholder, onChange }) {
    return(
        <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: '12px'}]} >
            <Text>{label}</Text>
            <TextInput
                style={[styles.input, {
                    flex: '1px',
                    color: value === "" ? "#ccc" : "#000"
                }]}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
            />
        </View>
    )
}

export default LabeledInput;

const styles = StyleSheet.create({
    input: {
        marginRight: '4px',
        marginLeft: '4px',
        fontWeight: 'bold',
        color: '#363636ff',
    }
});