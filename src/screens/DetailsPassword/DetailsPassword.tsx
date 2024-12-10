import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import styles from './style';
import { useAuth } from '../../contexts/AuthContext';  // Para acessar o usuário logado

const DetailsPassword = () => {
  const { user } = useAuth();  // Obtém o usuário logado
  const route = useRoute<RouteProp<HomeStackParamList, 'DetailsPassword'>>();
  const { passwordDetails } = route.params;

  const [editedDetails, setEditedDetails] = useState(passwordDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  // Toggle para mostrar ou esconder a senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para salvar as alterações
  const handleSaveChanges = async () => {
    if (!editedDetails.title || !editedDetails.password || !editedDetails.email) {
      Alert.alert('Erro', 'O título, o email e a senha são obrigatórios.');
      return;
    }

    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwords = storedPasswords ? JSON.parse(storedPasswords) : [];

      // Filtra as senhas para garantir que só as senhas do usuário atual sejam acessadas
      const userPasswords = passwords.filter((p: any) => p.userId === user.id);

      // Atualiza a senha correta do usuário
      const updatedPasswords = userPasswords.map((p: any) =>
        p.id === editedDetails.id ? { ...p, ...editedDetails } : p
      );

      // Salva novamente as senhas no AsyncStorage
      await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      Alert.alert('Sucesso', 'Detalhes atualizados!');
      
      // Atualiza a senha na tela imediatamente
      setEditedDetails({ ...editedDetails });
      setEditModalVisible(false);  // Fecha o modal
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  // Função para excluir a senha
  const handleDeletePassword = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwords = storedPasswords ? JSON.parse(storedPasswords) : [];

      // Filtra as senhas do usuário atual
      const userPasswords = passwords.filter((p: any) => p.userId === user.id);

      // Exclui a senha do usuário
      const updatedPasswords = userPasswords.filter((p: any) => p.id !== passwordDetails.id);

      // Atualiza as senhas no AsyncStorage
      await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      Alert.alert('Sucesso', 'Senha deletada!');
      setDeleteModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a senha.');
    }
  };

  useEffect(() => {
    // Verifica se a senha pertence ao usuário logado
    if (passwordDetails.email !== user?.email) {
      Alert.alert('Acesso negado', 'Você não tem permissão para acessar esta senha.');
    }
  }, [passwordDetails, user]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.header}>{editedDetails.title}</Text>

        {/* Nome de Usuário */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            value={editedDetails.email}  // Usando o estado editado
            editable={false}  // Torne editável conforme necessário
          />
        </View>

        {/* Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              value={editedDetails.password}  // Usando o estado editado
              secureTextEntry={!showPassword}
              editable={false}  // Torne editável conforme necessário
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={editedDetails.description || 'Sem descrição'}  // Usando o estado editado
            multiline
            editable={false}  // Torne editável conforme necessário
          />
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setEditedDetails({ ...passwordDetails });  // Passa os detalhes originais para edição
              setEditModalVisible(true);
            }}
          >
            <Ionicons name="create-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Modal de Edição */}
        <Modal
          visible={isEditModalVisible}
          animationType="slide"
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Editar Detalhes</Text>
            <TextInput
              style={styles.input}
              value={editedDetails.title}
              onChangeText={(text) => setEditedDetails({ ...editedDetails, title: text })}
              placeholder="Título"
            />
            <TextInput
              style={styles.input}
              value={editedDetails.email}
              onChangeText={(text) => setEditedDetails({ ...editedDetails, email: text })}
              placeholder="Usuário"
            />
            <TextInput
              style={styles.input}
              value={editedDetails.password}
              onChangeText={(text) => setEditedDetails({ ...editedDetails, password: text })}
              placeholder="Senha"
              secureTextEntry
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={editedDetails.description}
              onChangeText={(text) => setEditedDetails({ ...editedDetails, description: text })}
              placeholder="Descrição"
              multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Modal de Exclusão */}
        <Modal
          visible={isDeleteModalVisible}
          animationType="slide"
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Deletar Senha</Text>
            <Text style={styles.modalText}>Tem certeza que deseja deletar esta senha?</Text>
            <TouchableOpacity style={styles.button} onPress={handleDeletePassword}>
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default DetailsPassword;
