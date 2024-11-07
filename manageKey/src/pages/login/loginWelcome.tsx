import { View, Image, Text, TextInputProps } from "react-native";
import styles from "./styles";
import Button from "../../components/button";

type InputProps = TextInputProps & {
    title: string
}

export default function LoginWelcome() {
    return (
        <View style={styles.container}>
                        <Text style={styles.textTitle}>
    Welcome
    to{"\n"}
    manageKey
    {"\n"}{"\n"}
</Text>
            <Image style={styles.image} source={require("../../../assets/imagens/iconApp.png")} />

            
            <Button title="Login"> </Button>
            
        </View>
    )
}