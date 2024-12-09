import React from 'react';
import { View, StyleSheet } from 'react-native';

type ScreenWrapperProps = {
  children: React.ReactNode; // Para renderizar o conteúdo da tela
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292024', // Cor de fundo semelhante à imagem
    paddingHorizontal: 16, // Espaçamento opcional
    paddingVertical: 16, // Espaçamento opcional
    justifyContent: 'center',
    padding: 20,
  },
});

export default ScreenWrapper;
