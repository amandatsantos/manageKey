// src/App.tsx
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

// Configurações de polyfill para geração de números aleatórios e criptografia
import 'react-native-get-random-values';

// Apenas inclua 'react-native-crypto' se seu projeto não for gerenciado pelo Expo
// Caso esteja usando Expo, remova ou use outra abordagem para criptografia
import crypto from 'crypto';

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default App;

// Se estiver usando Expo, adicione o código abaixo para registrar o componente raiz
// Caso contrário, remova esta parte
import { registerRootComponent } from 'expo';
registerRootComponent(App);
