// src/navigation/HomeStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from './types';
import Details from '../screens/Details'; // Exemplo de outra tela
import Home from '../screens/Home';
import ViewPasswords from '../screens/ViewPasswords';
import ViewProfile from '../screens/ViewProfile';
import CreatePassword from '../screens/CreatePassword';


const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Página Inicial' }} />
    <Stack.Screen name="ViewPasswords" component={ViewPasswords} options={{ headerTitle: 'ViewPassword' }} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerTitle: 'CreatePassword' }} />
    <Stack.Screen name="ViewProfile" component={ViewProfile} options={{ headerTitle: 'ViewProfile' }} />

    <Stack.Screen name="Details" component={Details} options={{ headerTitle: 'Detalhes' }} />
  </Stack.Navigator>
);

export default HomeStack;
