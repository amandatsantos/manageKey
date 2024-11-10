import { StyleSheet } from "react-native";
import { theme } from "../../../../theme"; // Verifique o caminho para o arquivo de tema

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'center',
    },
    button: {
        paddingVertical: 0,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'center', // Garante que o próprio botão seja centralizado no contêiner pai
    },
    primary: {
        backgroundColor: '#D1E3DD', // Cor de fundo dos botões primários
    },
    warning: {
        backgroundColor: theme.colors.warning, // Preservado do tema
    },
    error: {
        backgroundColor: theme.colors.error, // Preservado do tema
    },
    transparent: {
        backgroundColor: 'transparent',
    },
    text: {
        color: '#2b1d24', // Cor do texto padrão
        fontSize: 16,
        fontWeight: 'bold',
    },
    transparentText: {
        color: theme.colors.textSecondary, // Cor do texto para o botão transparente
    },
});

export default styles;
