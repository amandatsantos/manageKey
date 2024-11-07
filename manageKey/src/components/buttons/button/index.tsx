import { View, Button, Text, TouchableOpacityProps, TouchableOpacity, Pressable } from "react-native";
import styles from "./styles";

type ButtonProps = TouchableOpacityProps & {
    title: string;
}

export default function button({ title }: ButtonProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

