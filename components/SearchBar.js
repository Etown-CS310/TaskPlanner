import { TextInput, View, StyleSheet } from "react-native";

function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for Task"
        style={styles.input}
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
    color: '#ccc',
  },
});