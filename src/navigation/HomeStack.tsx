// src/navigation/HomeStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from './types';
import DetailsPassword from '../screens/DetailsPassword/DetailsPassword'; // Exemplo de outra tela
import Home from '../screens/Home/Home';
import ViewPasswords from '../screens/ViewPassword/ViewPasswords';
import ViewProfile from '../screens/ViewProfile/ViewProfile';
import CreatePassword from '../screens/CreatePassword/CreatePassword';


const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Página Inicial' }} />
    <Stack.Screen name="ViewPasswords" component={ViewPasswords} options={{ headerTitle: 'ViewPassword' }} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerTitle: 'CreatePassword' }} />
    <Stack.Screen name="ViewProfile" component={ViewProfile} options={{ headerTitle: 'ViewProfile' }} />
    <Stack.Screen name="DetailsPassword" component={DetailsPassword} options={{ headerTitle: 'Detalhes da Senha' }} />
    </Stack.Navigator>
);

export default HomeStack;
