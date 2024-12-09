import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import ScreenWrapper from '../components/scrennWrapper';
import globalStyles from '../styles'; // Estilos globais

const Home = ({ navigation }: any) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <ScreenWrapper>
      <View style={globalStyles.container}>
        {isAuthenticated ? (
          <>
            <Text style={globalStyles.label}>Bem-vindo, {user}!</Text>
            <Button title="Sair" onPress={handleLogout} />
          </>
        ) : (
          <>
            <Text style={globalStyles.label}>Você não está logado.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={globalStyles.link}>Fazer Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Home;
