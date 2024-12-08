// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { useAuth } from '../contexts/AuthContext';

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
