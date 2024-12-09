import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../components/scrennWrapper';  // Componente Layout
import Input from '../components/Input';  // Componente Input
import Button from '../components/Button';  // Componente Botão
import globalStyles from '../styles';  // Estilos globais

const CreatePassword = () => {
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const handleSavePassword = async () => {
    if (!title || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwordsList = storedPasswords ? JSON.parse(storedPasswords) : [];

      const newPassword = { title, password };
      passwordsList.push(newPassword);

      await AsyncStorage.setItem('passwords', JSON.stringify(passwordsList));

      Alert.alert('Sucesso', 'Senha salva com sucesso!');
      setTitle('');
      setPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a senha.');
    }
  };

  return (
    <ScreenWrapper>
      <Text style={globalStyles.header}>Criar Nova Senha</Text>
      <Input
        label="Título da Senha"
        value={title}
        onChangeText={setTitle}
      />
            <Input
        label="Email/Username"
        value={title}
        onChangeText={setTitle}
      />

      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

<Input
        label="Descrição"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Salvar Senha" onPress={handleSavePassword} />
    </ScreenWrapper>
  );
};

export default CreatePassword;
