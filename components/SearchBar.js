import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

function SearchBar() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for Task"
        value={text}
        onChangeText={setText}
        style={[ styles.input, {color: text === "" ? "#ccc" : "#000"} ]}
      />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    marginTop: 25,
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
  },
});