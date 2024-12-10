import React, { useState } from 'react';
import { View, Text, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper'; // Componente Layout
import Input from '../../components/Input'; // Componente Input
import Button from '../../components/Button'; // Componente Botão
import styles from '../CreatePassword/style';
import { useAuth } from '../../contexts/AuthContext'; // Contexto de autenticação

const CreatePassword = () => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth(); // Obter o usuário logado

  const handleSavePassword = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    if (!title || !password || !email || !description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwordsList = storedPasswords ? JSON.parse(storedPasswords) : [];

      const newPassword = {
        title,
        email,
        password,
        description,
        userId: user.id, // Associar ao usuário logado
      };

      passwordsList.push(newPassword);
      await AsyncStorage.setItem('passwords', JSON.stringify(passwordsList));

      Alert.alert('Sucesso', 'Senha salva com sucesso!');
      setTitle('');
      setEmail('');
      setPassword('');
      setDescription('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a senha.');
    }
  };

  return (
    <ScreenWrapper>
      <Input
        label="Título da Senha"
        value={title}
        onChangeText={setTitle}
        placeholder="Título da Senha"
      />

      <Input
        label="Email/Username"
        value={email}
        onChangeText={setEmail}
        placeholder="Email/Username"
      />

      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Senha"
      />

      {/* Campo de Descrição com tamanho maior */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição"
          multiline
        />
      </View>

      <Button title="Salvar Senha" onPress={handleSavePassword} />
    </ScreenWrapper>
  );
};

export default CreatePassword;
