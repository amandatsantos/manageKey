import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../../components/buttons/button";
import globalStyles from "../../styles/global"; // Importa os estilos globais
import styles from "../newPassword/styles";

export default function NewPasswordScreen() {
    return (
        <View style={globalStyles.container}>
             <View style={styles.container}>
            <Text style={styles.title}>New password {'\n'}</Text>
            <TextInput placeholder="Title" style={globalStyles.input} />
            <TextInput placeholder="Email/Username" style={globalStyles.input} />
            <TextInput placeholder="Password" secureTextEntry={true} style={globalStyles.input} />
            <TextInput placeholder="Description" style={globalStyles.input} />

            <Button title="Save" className="primary" onPress={() => alert('Password saved!')} />
                
            </View>
        </View>
    );
}

