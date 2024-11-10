import { View, Image, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/buttons/button";
import styles from "./styles";
import { RoutesParams } from "../../navigation/routesParams";

// Define o tipo de navegação para a tela Home
type HomeParamsList = NativeStackNavigationProp<RoutesParams, "Home">;

export default function HomeScreen() {
    
    // Configura a navegação usando o hook useNavigation com o tipo HomeParamsList
    const navigation = useNavigation<HomeParamsList>();

    return (
        <View style={styles.container}>
            
            {/* Saudação e título */}
            <Text style={styles.textTitle}>
                welcome ao{"\n"}
                manageKey
                {"\n"}{"\n"}
            </Text>

            {/* Imagem do ícone do aplicativo */}
            <Image
                style={styles.image}
                source={require("../../../assets/imagens/iconApp.png")}
            />

            {/* Botão para navegar até a tela de login */}
            
            <Button className="primary" title="Login"  onPress={() => navigation.navigate("Login")}  />
            <Button className="primary" title="ListPass"  onPress={() => navigation.navigate("PasswordList")}  />
            <Button className="primary" title="NewPass"  onPress={() => navigation.navigate("NewPassword")}  />
            <Button className="primary" title="DetailsPass"  onPress={() => navigation.navigate("PasswordDetails")}  />
            <Button className="primary" title="Profile"  onPress={() => navigation.navigate("Profile")}  />
        </View>
    );
}