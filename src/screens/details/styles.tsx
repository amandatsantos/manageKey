import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b1d24',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#d3e0e2',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#d3e0e2',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    textArea: {
        backgroundColor: '#d3e0e2',
        padding: 10,
        borderRadius: 5,
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default styles;