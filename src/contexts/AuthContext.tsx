import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string) => Promise<boolean>;
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
        setUser(storedUser);
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

  const register = async (email: string, password: string) => {
    try {
      // Recuperar dados existentes
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : {};
  
      // Verificar se o usuário já existe
      if (users[email]) {
        console.error('Usuário já existe!');
        return false; // Usuário já registrado
      }
  
      // Adicionar novo usuário
      users[email] = password;
  
      // Salvar no AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(users));
  
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };
  const login = async (email: string, password: string) => {
    try {
      // Recuperar dados armazenados
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : {};
  
      // Validar e-mail e senha
      if (users[email] && users[email] === password) {
        await AsyncStorage.setItem('user', email);
        setUser(email);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
