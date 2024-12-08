// src/navigation/AuthStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Welcome from '../screens/Welcome';
import Home from '../screens/Welcome';
import Details from '../screens/Details'; // Exemplo de outra tela

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Página Inicial' }} />
    <Stack.Screen name="Details" component={Details} options={{ headerTitle: 'Detalhes' }} />
  </Stack.Navigator>
);

export default AuthStack;
