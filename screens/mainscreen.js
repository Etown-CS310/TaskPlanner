import { StyleSheet, View, Text } from "react-native";
    function MainScreen() {

    return (
        <View style={styles.container}>
            <Text>Main Screen</Text>
        </View>
    );
    }


export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

});