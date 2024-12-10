import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/scrennWrapper';
import styles from './style';

const Home = ({ navigation }: any) => {
  const { isAuthenticated, user, logout } = useAuth();

  // Função de logout
  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Login');
    }
  }, [isAuthenticated, navigation]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Títulos */}
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.appName}>manageKey</Text>
        
        {/* Ícone */}
        <Image
          source={require('../../../assets/imagens/iconApp.png')} // Substitua pelo caminho do ícone
          style={styles.icon}
        />

        {isAuthenticated ? (
          <View style={styles.buttonContainer}>
            <Button title="Ver Senhas" onPress={() => navigation.navigate('ViewPasswords')} />
            <Button title="Criar Senha" onPress={() => navigation.navigate('CreatePassword')} />
            <Button title="Ver Perfil" onPress={() => navigation.navigate('ViewProfile')} />
            <Button title="Sair" onPress={handleLogout} />
          </View>
        ) : (

          
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Home;

