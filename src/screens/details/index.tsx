import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../../components/buttons/button";
import globalStyles from "../../styles/global"; // Importa os estilos globais
import styles from "./styles";


export default function PasswordDetailsScreen() {
    return (
        <View style={ globalStyles.container}>
           
            <View style={styles.container}>
            <Text style={styles.title}>Details password{'\n'}</Text>
            <TextInput placeholder="Title" value="League of Legends" style={styles.input} editable={false} />
            <TextInput placeholder="Email/Username" value="mandalorian" style={styles.input} editable={false} />
            <TextInput placeholder="Password" value="********" secureTextEntry={true} style={styles.input} editable={false} />
            <TextInput
                placeholder="Description"
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                style={styles.textArea}
                multiline
                editable={false}
            />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Edit" className="secondary" onPress={() => alert('Edit mode activated!')} />
                <Button title="Delete" className="danger" onPress={() => alert('Password deleted!')} />
            </View>
        </View>
    );
}

