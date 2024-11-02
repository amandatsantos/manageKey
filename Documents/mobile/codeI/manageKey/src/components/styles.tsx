import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D1E3DD", 
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 60,
        shadowColor: "#000",
        shadowOffset: { width: 191, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 40,
    },
    buttonText: {
        color: "#212934", 
        fontWeight: "bold",
    },
});

export default styles