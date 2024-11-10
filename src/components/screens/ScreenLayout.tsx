// ScreenLayout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/global';

type ScreenLayoutProps = {
    title: string;
    children: React.ReactNode;
};

export default function ScreenLayout({ title, children }: ScreenLayoutProps) {
    return (
        <View style={styles.screenContainer}>
            {/* Cabeçalho fixo no topo */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>

            {/* Conteúdo da tela abaixo do cabeçalho */}
            <View style={styles.contentContainer}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        width: '100%', // Garante que o contêiner da tela ocupe a largura total
    },
    headerContainer: {
        width: '100%', // O cabeçalho ocupa toda a largura horizontal
        backgroundColor: '#D1E3DD',
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2b1d24',
    },
    contentContainer: {
        flex: 1,
        marginTop: 15, // Espaço para que o conteúdo fique logo abaixo do cabeçalho
        paddingHorizontal: 20,
        width: '100%', // Garante que o conteúdo também ocupe a largura total
    },
});
