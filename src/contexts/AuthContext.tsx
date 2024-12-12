import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import Config from 'react-native-config';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const SECRET_KEY = Config.SECRET_KEY || 'default_secret_key';

type AuthContextType = {
  isAuthenticated: boolean;
  user: { id: string; email: string; fullname?: string } | null;  // 'fullname' agora é opcional
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, fullname: string) => Promise<boolean>;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  updateUser: (email: string, fullname: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string; fullname?: string } | null>(null);  // 'fullname' opcional aqui também

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };
    loadUser();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);  // Garante que o usuário será deslogado
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  const register = async (email: string, password: string, fullname: string) => {
    try {
      const userId = uuidv4();
      const userKey = `user_${userId}`;

      const userList = await AsyncStorage.getItem('user_list');
      const parsedList = userList ? JSON.parse(userList) : [];
      if (parsedList.some((u: { email: string }) => u.email === email)) {
        console.error('Usuário já existe!');
        return false;
      }

      const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

      const userData = { id: userId, email, fullname, password: encryptedPassword };
      await AsyncStorage.setItem(userKey, JSON.stringify(userData));
      await AsyncStorage.setItem('user_list', JSON.stringify([...parsedList, { id: userId, email }]));
      await AsyncStorage.setItem('user', JSON.stringify({ id: userId, email, fullname }));  // Armazenando 'fullname'

      setUser({ id: userId, email, fullname });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userList = await AsyncStorage.getItem('user_list');
      const parsedList = userList ? JSON.parse(userList) : [];
      const userEntry = parsedList.find((u: { email: string }) => u.email === email);
  
      if (userEntry) {
        const userKey = `user_${userEntry.id}`;
        const storedUser = await AsyncStorage.getItem(userKey);
  
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const decryptedPassword = CryptoJS.AES.decrypt(userData.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  
          if (decryptedPassword === password) {
            await AsyncStorage.setItem('user', JSON.stringify({ id: userData.id, email: userData.email, fullname: userData.fullname }));  // Incluindo 'fullname'
            setUser({ id: userData.id, email: userData.email, fullname: userData.fullname });
            setIsAuthenticated(true);
            return true;
          }
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
      const userList = await AsyncStorage.getItem('user_list');
      const parsedList = userList ? JSON.parse(userList) : [];
      const userEntry = parsedList.find((u: { email: string }) => u.email === email);

      if (userEntry) {
        const userKey = `user_${userEntry.id}`;
        const storedUser = await AsyncStorage.getItem(userKey);

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const encryptedPassword = CryptoJS.AES.encrypt(newPassword, SECRET_KEY).toString();

          userData.password = encryptedPassword;
          await AsyncStorage.setItem(userKey, JSON.stringify(userData));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      return false;
    }
  };

  const updateUser = async (email: string, fullname: string) => {
    try {
      if (user) {
        // Atualizar os dados na AsyncStorage
        const userKey = `user_${user.id}`;
        const storedUser = await AsyncStorage.getItem(userKey);
  
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          userData.email = email;
          userData.fullname = fullname;  // Atualizando 'fullname'

          // Salvar os dados atualizados na AsyncStorage
          await AsyncStorage.setItem(userKey, JSON.stringify(userData));
          
          // Atualizar o estado do contexto
          setUser({ id: user.id, email, fullname });  // Atualizando com 'fullname'
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser, register, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
