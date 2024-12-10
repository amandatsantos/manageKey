// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { useAuth } from '../contexts/AuthContext';

const AppNavigator = () => {
  const { isAuthenticated } = useAuth(); // Este é o estado de autenticação

  return (
    <NavigationContainer>
      {isAuthenticated ? <HomeStack /> : <AuthStack />} 
    </NavigationContainer>
  );
};


export default AppNavigator;
