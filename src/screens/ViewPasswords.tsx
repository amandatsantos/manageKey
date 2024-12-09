import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../components/scrennWrapper';  // Componente Layout
import globalStyles from '../styles';  // Estilos globais

const ViewPasswords = () => {
  const [passwords, setPasswords] = useState<{ title: string, password: string }[]>([]);

  useEffect(() => {
    const loadPasswords = async () => {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwordsList = storedPasswords ? JSON.parse(storedPasswords) : [];
      setPasswords(passwordsList);
    };

    loadPasswords();
  }, []);

  return (
    <ScreenWrapper>
      <Text style={globalStyles.header}>Senhas Armazenadas</Text>
      <FlatList
        data={passwords}
        renderItem={({ item }) => (
          <View style={globalStyles.passwordItem}>
            <Text style={globalStyles.passwordText}>{item.title}: {item.password}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScreenWrapper>
  );
};

export default ViewPasswords;
