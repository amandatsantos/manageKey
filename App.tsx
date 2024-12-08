// src/App.tsx
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default App;
