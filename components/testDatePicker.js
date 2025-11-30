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