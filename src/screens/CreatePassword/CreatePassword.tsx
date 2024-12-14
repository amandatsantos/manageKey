import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper'; // Componente Layout
import Input from '../../components/Input'; // Componente Input
import Button from '../../components/Button'; // Componente Botão
import styles from '../CreatePassword/style';
import { useAuth } from '../../contexts/AuthContext'; // Contexto de autenticação
import { useNavigation } from '@react-navigation/native'; // Navegação

const CreatePassword = () => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState(''); // Alterado para nickname
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth(); // Obter o usuário logado
  const navigation = useNavigation(); // Hook de navegação

  const handleSavePassword = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }
  
    if (!title || !password || !nickname || !description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwordsList = storedPasswords ? JSON.parse(storedPasswords) : [];
  
      // Verifica se a senha já existe para o usuário
      const existingPassword = passwordsList.some(
        (p: { userId: string; title: string; nickname: string; }) => p.userId === user.id && (p.title === title || p.nickname === nickname)
      );
  
      if (existingPassword) {
        Alert.alert('Erro', 'Já existe uma senha com esse título ou nickname.');
        return;
      }
  
      const newPassword = {
        title,
        nickname,
        password,
        description,
        userId: user.id,
      };
  
      passwordsList.push(newPassword);
      await AsyncStorage.setItem('passwords', JSON.stringify(passwordsList));
  
      Alert.alert('Sucesso', 'Senha salva com sucesso!');
      navigation.goBack();
  
      // Limpar os campos após salvar
      setTitle('');
      setNickname('');
      setPassword('');
      setDescription('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a senha.');
    }
  };

  const handleGoBack = () => {
    navigation.goBack(); // Voltar para a tela anterior
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
        label="Nickname" // Alterado de Email/Username para Nickname
        value={nickname} // Usando nickname
        onChangeText={setNickname} // Alterado para setNickname
        placeholder="Nickname"
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

      {/* Botões de voltar e confirmar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonIcon}>↩</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
          <Text style={styles.buttonIcon}>✔</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default CreatePassword;
