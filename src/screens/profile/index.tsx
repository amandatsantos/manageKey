import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../../components/buttons/button";
import globalStyles from "../../styles/global";
import styles from "./styles";

export default function ProfileScreen() {
    return (
        <View style={globalStyles.container}>
            <View style={styles.profilePicture} />
            <TextInput placeholder="Email" style={globalStyles.input} value="username@example.com" />
            <TextInput placeholder="Username" style={globalStyles.input} value="user123" />
            <View style={styles.buttonContainer}>
                <Button title="Edit" className="primary" onPress={() => alert('Edit pressed')} />
                <Button title="Save" className="secondary" onPress={() => alert('Save pressed')} />
            </View>
        </View>
    );
}

