// src/contexts/AuthContext.ts
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptData, decryptData, generateKeyAndIV } from '../utils/cryptoUtils'; // Importando as funções de criptografia

type AuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, fullname: string) => Promise<boolean>;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Carregar estado persistido ao inicializar o contexto
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const decryptedUser = decryptData(storedUser); // Descriptografa o usuário armazenado
        setUser(decryptedUser);
        setIsAuthenticated(true);
      }
    };
    loadUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (email: string, password: string, fullname: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(decryptData(storedUsers)) : {}; // Descriptografa os usuários armazenados

      // Verificar se o usuário já existe
      if (users[email]) {
        console.error('Usuário já existe!');
        return false;
      }

      // Gerar chave e IV de forma segura
      const { key, iv } = generateKeyAndIV();

      // Criptografar a senha com a chave e IV
      const encryptedPassword = encryptData(password, key, iv);

      // Salvar o usuário com a senha criptografada
      users[email] = { password: encryptedPassword, fullname };

      // Criptografa e salva os usuários atualizados
      await AsyncStorage.setItem('users', encryptData(JSON.stringify(users), key, iv));

      const userData = JSON.stringify({ email, fullname });
      await AsyncStorage.setItem('user', encryptData(userData, key, iv)); // Criptografa os dados do usuário atual
      setUser(userData);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(decryptData(storedUsers)) : {}; // Descriptografa os usuários armazenados

      if (users[email]) {
        const encryptedPassword = users[email].password;
        // Descriptografar a senha
        const { key, iv } = generateKeyAndIV();
        const decryptedPassword = decryptData(encryptedPassword, key, iv);

        // Comparar a senha fornecida com a senha descriptografada
        if (decryptedPassword === password) {
          const userData = JSON.stringify({ email, fullname: users[email].fullname });
          await AsyncStorage.setItem('user', encryptData(userData, key, iv)); // Criptografa os dados do usuário autenticado
          setUser(userData);
          setIsAuthenticated(true);
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(decryptData(storedUsers)) : {}; // Descriptografa os usuários armazenados

      if (users[email]) {
        // Gerar chave e IV de forma segura
        const { key, iv } = generateKeyAndIV();

        // Criptografar a nova senha
        const encryptedPassword = encryptData(newPassword, key, iv);
        users[email].password = encryptedPassword;

        // Criptografa e salva os usuários atualizados
        await AsyncStorage.setItem('users', encryptData(JSON.stringify(users), key, iv));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao resetar a senha:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
