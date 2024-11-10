import React from 'react';
import { View, TextInput, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../../components/screens/ScreenLayout';
import globalStyles from '../../styles/global';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

type loginParamsList = NativeStackNavigationProp<RoutesParams, "Login">;

export default function LoginScreen() {
    const navigation = useNavigation<loginParamsList>();
    const [isRememberMe, setIsRememberMe] = React.useState(false);

    return (
        <View style={globalStyles.container}>
        <ScreenLayout title="Login">
        {/* <ScreenLayout style= {styles.headerContainer}title="Login"> */}
            {/* Título principal da tela */}
            <Text style={styles.title}>Password manager</Text>

            {/* Campos de entrada de texto */}
            <View style={globalStyles.inputContainer}>
                <Text style={styles.label}>User</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="User"
                    placeholderTextColor="#D1D1D1"
                />
            </View>
            <View style={globalStyles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Password"
                    placeholderTextColor="#D1D1D1"
                    secureTextEntry
                />
            </View>

            {/* Lembre-se de mim (toggle) */}
            <View style={styles.rememberMeContainer}>
                <Switch
                    value={isRememberMe}
                    onValueChange={() => setIsRememberMe(!isRememberMe)}
                    trackColor={{ false: "#767577", true: "#8e0000" }}
                    thumbColor={isRememberMe ? "#8e0000" : "#f4f3f4"}
                />
                <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

            {/* Botão de confirmação */}
            <TouchableOpacity style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            {/* Links de navegação */}
            <TouchableOpacity onPress={() => navigation.navigate("ResetPass")}>
                <Text style={styles.link}>Forget Pass?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>Not registered? Register</Text>
            </TouchableOpacity>
        </ScreenLayout>
        </View>
    );
}