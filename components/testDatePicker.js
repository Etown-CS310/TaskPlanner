            import DateTimePicker from '@react-native-community/datetimepicker';
            
            
            const [date, setDate] = useState(new Date());
            const [showDatePicker, setShowDatePicker] = useState(false);
    
            const dateChangeHandler = (event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
                setShowDatePicker(false);
            };
    
    
    
    
    <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: '12px'}]} >
        <TouchableOpacity onPress={() => setShowDatePicker(true)}> 
            <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
            <DateTimePicker
                mode="date"
                display="default"
                title="Choose Start Date"
                value={date}
                onChange={dateChangeHandler}
            />
        )}
    </View>