import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

function SearchBar({ onSearchChange }) {
  const { theme } = useTheme();
  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    setText(newText);
    if (onSearchChange) {
      onSearchChange(newText);
    }
  };

  return (
    <View style={[styles.container, { borderColor: theme.colors.border }]}>
      <TextInput
        placeholder="Search for Task"
        placeholderTextColor={theme.colors.textSecondary}
        value={text}
        onChangeText={handleTextChange}
        style={[ styles.input, {color: text === "" ? theme.colors.textSecondary : theme.colors.text, backgroundColor: theme.colors.surface} ]}
      />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 25,
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
    textAlign: 'center',
  },
});