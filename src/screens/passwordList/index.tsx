import React from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/global";
import styles from "./styles";

export default function PasswordListScreen() {
    return (
        <View style={globalStyles.container}>
            <TextInput placeholder="Pesquisar..." style={globalStyles.input} />
            <ScrollView>
                {["SWAP", "GITHUB", "GOV", "OUTLOOK", "LEAGUE OF LEGENDS"].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.item}>
                        <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}