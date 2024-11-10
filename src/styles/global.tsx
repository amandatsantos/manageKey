import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b1d24', // Cor de fundo padrão
        padding: 20,

    },
    input: {
        backgroundColor: '#d3e0e2', // Cor de fundo dos inputs
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonText: {
        color: '#2b1d24', // Cor do texto do botão
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#D1E3DD', // Cor dos links
        textAlign: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: 24, // Tamanho da fonte do título
        color: '#D1E3DD', // Cor do título
        textAlign: 'center', // Alinhamento centralizado
        marginBottom: 20, // Espaçamento inferior
        fontWeight: 'bold', // Peso da fonte para destaque
    },
});

export default globalStyles;
