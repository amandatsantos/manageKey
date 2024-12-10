import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/scrennWrapper';
import globalStyles from '../../styles'; // Estilos globais

const Home = ({ navigation }: any) => {
  const { isAuthenticated, user, logout } = useAuth();

  // Função de logout
  const handleLogout = async () => {
    await logout(); // Realiza o logout, limpando os dados do usuário
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Redireciona para o Login após o logout
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Login'); // Caso o usuário não esteja autenticado, redireciona para Login
    }
  }, [isAuthenticated, navigation]);

  return (
    <ScreenWrapper>
      <View style={globalStyles.container}>
        {isAuthenticated ? (
          <>
            {/* Exibindo o nome completo ou o e-mail do usuário */}
            <Text style={globalStyles.welcomeText}>
  Bem-vindo, {user?.fullname || user?.email} (ID: {user?.id})
</Text>

            <View style={globalStyles.buttonContainer}>
              <Button title="Ver Senhas" onPress={() => navigation.navigate('ViewPasswords')} />
              <Button title="Criar Senha" onPress={() => navigation.navigate('CreatePassword')} />
              <Button title="Ver Perfil" onPress={() => navigation.navigate('ViewProfile')} />
              <Button title="Sair" onPress={handleLogout} />
            </View>
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
