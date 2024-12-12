import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from './types';
import DetailsPassword from '../screens/DetailsPassword/DetailsPassword'; // Exemplo de outra tela
import Home from '../screens/Home/Home';
import ViewPasswords from '../screens/ViewPassword/ViewPasswords';
import ViewProfile from '../screens/ViewProfile/ViewProfile';
import CreatePassword from '../screens/CreatePassword/CreatePassword';

const Stack = createStackNavigator<HomeStackParamList>();

// Estilos centralizados para o cabeçalho
const headerStyles = {
  headerStyle: {
    backgroundColor: '#D1E3DD', // Cor de fundo do cabeçalho
  },
  headerTitleAlign: 'center', // Centraliza o título
  headerTintColor: '#000000', // Cor do texto do cabeçalho
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={headerStyles}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerTitle: 'Página Inicial' }}
    />
    <Stack.Screen
      name="ViewPasswords"
      component={ViewPasswords}
      options={{ headerTitle: 'Ver Senha' }}
    />
    <Stack.Screen
      name="CreatePassword"
      component={CreatePassword}
      options={{ headerTitle: 'Criar Senha' }}
    />
    <Stack.Screen
      name="ViewProfile"
      component={ViewProfile}
      options={{ headerTitle: 'Perfil' }}
    />
    <Stack.Screen
      name="DetailsPassword"
      component={DetailsPassword}
      options={{ headerTitle: 'Detalhes da Senha' }}
    />
  </Stack.Navigator>
);

export default HomeStack;
