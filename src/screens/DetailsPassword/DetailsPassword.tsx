import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import styles from './style';
import { useAuth } from '../../contexts/AuthContext';  // Para acessar o usuário logado

const DetailsPassword = () => {
  const { user } = useAuth();  // Obtém o usuário logado
  const route = useRoute<RouteProp<HomeStackParamList, 'DetailsPassword'>>();
  const { passwordDetails } = route.params;

  const navigation = useNavigation(); // Navegação para voltar à tela de visualização

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
      const userPasswords = passwords.filter((p: any) => p.userId === user?.id);

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
      // Recupera as senhas armazenadas no AsyncStorage
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwords = storedPasswords ? JSON.parse(storedPasswords) : [];
  
      // Encontra o índice da senha que corresponde ao passwordDetails.id
      const indexToDelete = passwords.findIndex(
        (p: any) => p.id === passwordDetails.id && p.userId === user?.id
      );
  
      if (indexToDelete === -1) {
        Alert.alert('Erro', 'Senha não encontrada!');
        return;
      }
  
      // Remove a senha do array de senhas
      passwords.splice(indexToDelete, 1);
  
      // Salva novamente o array de senhas no AsyncStorage sem a senha deletada
      await AsyncStorage.setItem('passwords', JSON.stringify(passwords));
  
      Alert.alert('Sucesso', 'Senha deletada!');
      setDeleteModalVisible(false);  // Fecha o modal de exclusão
  
      // Navega de volta para a tela anterior (após a exclusão)
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a senha.');
    }
  };
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
                color="#6c6772"
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
            <Ionicons name="create-outline" size={24} color="#6c6772" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Ionicons name="trash-outline" size={24} color="#6c6772" />
          </TouchableOpacity>
        </View>

        {/* Modal de Edição */}
<Modal
  visible={isEditModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setEditModalVisible(false)}
>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Editar Detalhes</Text>
          <TextInput
            style={[styles.input, { marginBottom: 16 }]} // Adicionado espaçamento entre os campos
            value={editedDetails.title}
            onChangeText={(text) => setEditedDetails({ ...editedDetails, title: text })}
            placeholder="Título"
          />
          <TextInput
            style={[styles.input, { marginBottom: 16 }]}
            value={editedDetails.email}
            onChangeText={(text) => setEditedDetails({ ...editedDetails, email: text })}
            placeholder="Usuário"
          />
          <TextInput
            style={[styles.input, { marginBottom: 16 }]}
            value={editedDetails.password}
            onChangeText={(text) => setEditedDetails({ ...editedDetails, password: text })}
            placeholder="Senha"
            secureTextEntry
          />
          <TextInput
            style={[styles.input, { height: 80, marginBottom: 16 }]} // Altura ajustada e espaçamento
            value={editedDetails.description}
            onChangeText={(text) => setEditedDetails({ ...editedDetails, description: text })}
            placeholder="Descrição"
            multiline
          />

          <View style={styles.modalButtons}>
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
        </View>
      </View>
    </Modal>

        {/* Modal de Exclusão */}
        <Modal
          visible={isDeleteModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setDeleteModalVisible(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Deletar Senha</Text>
            <Text style={styles.modalHeader}>Tem certeza que deseja deletar esta senha?</Text>
            <View style={styles.modalButtons}>
          < TouchableOpacity style={styles.button} onPress={handleDeletePassword}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeleteModalVisible(false)} style={styles.button}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default DetailsPassword;
