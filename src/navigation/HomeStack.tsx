// src/navigation/HomeStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from './types';
import Home from '../screens/Welcome';
import Details from '../screens/Details'; // Exemplo de outra tela

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Página Inicial' }} />
    <Stack.Screen name="Details" component={Details} options={{ headerTitle: 'Detalhes' }} />
  </Stack.Navigator>
);

export default HomeStack;
