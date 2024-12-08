import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const Welcome = ({ navigation }: any) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Text>Bem-vindo, {user}!</Text>
          <Button title="Sair" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text>Você não está logado.</Text>
          <Button title="Fazer Login" onPress={() => navigation.navigate('Login')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Welcome;
