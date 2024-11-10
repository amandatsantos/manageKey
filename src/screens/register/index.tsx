// Importa os componentes necessários do React Native e outros módulos
import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Button from "../../components/buttons/button";

import { RoutesParams } from "../../navigation/routesParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// Define o tipo de navegação para a tela de registro
type RegisterParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

// Função principal do componente RegisterScreen
export default function RegisterScreen() {
    // Configura a navegação usando o hook useNavigation com o tipo RegisterParamsList
    const navigation = useNavigation<RegisterParamsList>();

    return (
        // Contêiner principal da tela de registro
        <View style={styles.container}>
            {/* Título da tela */}
            <Text style={styles.title}>Password manager</Text>
            
            {/* Campos de entrada para nome de usuário, senha e nome completo */}
            <TextInput placeholder="User" style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} />
            <TextInput placeholder="Confirm Password" secureTextEntry={true} style={styles.input} />
            <TextInput placeholder="Full Name" style={styles.input} />

            {/* Botão de confirmação */}
            <Button title="Confirm" className="primary" onPress={() => alert('Registered successfully!')} />
        </View>
    );
}

// Estilos para a tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b1d24', // Cor de fundo semelhante ao da imagem
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#d3e0e2', // Cor do título semelhante
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#d3e0e2', // Cor de fundo dos inputs
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    }
});