// Importa os componentes necessários do React Native e outros módulos
import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Button from "../../components/buttons/button";

import { RoutesParams } from "../../navigation/routesParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// Define o tipo de navegação para a tela de redefinição de senha
type ResetPassParamsList = NativeStackNavigationProp<RoutesParams, 'ResetPass'>;

// Função principal do componente ResetPassScreen
export default function ResetPassScreen() {
    // Configura a navegação usando o hook useNavigation com o tipo ResetPassParamsList
    const navigation = useNavigation<ResetPassParamsList>();

    return (
        // Contêiner principal da tela de redefinição de senha
        <View style={styles.container}>
            {/* Título da tela */}
            <Text style={styles.header}>Reset Pass</Text>
            <Text style={styles.title}>Password manager</Text>
            
            {/* Campos de entrada para nome de usuário e senha */}
            <TextInput placeholder="User" style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} />
            <TextInput placeholder="Confirm Password" secureTextEntry={true} style={styles.input} />

            {/* Botão de confirmação */}
            <Button title="Confirm" className="primary" onPress={() => alert('Password reset successfully!')} />
        </View>
    );
}

// Estilos para a tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b1d24', // Cor de fundo semelhante à imagem
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        color: '#d3e0e2',
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        color: '#d3e0e2',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#d3e0e2', // Cor dos campos de entrada
        borderRadius: 5,
        marginBottom: 15,
        padding: 10,
    },
});

