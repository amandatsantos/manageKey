import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import styles from './style';

const DetailsPassword = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'DetailsPassword'>>(); 
  const { passwordDetails } = route.params;

  const [editedDetails, setEditedDetails] = useState(passwordDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChanges = async () => {
    if (!editedDetails.title || !editedDetails.password || !editedDetails.user) {
      Alert.alert('Erro', 'O título, o usuário e a senha são obrigatórios.');
      return;
    }

    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwords = storedPasswords ? JSON.parse(storedPasswords) : [];
      const updatedPasswords = passwords.map((p: any) =>
        p.id === editedDetails.id ? editedDetails : p
      );
      await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      Alert.alert('Sucesso', 'Detalhes atualizados!');
      setEditModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  const handleDeletePassword = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwords = storedPasswords ? JSON.parse(storedPasswords) : [];
      const updatedPasswords = passwords.filter((p: any) => p.id !== passwordDetails.id);
      await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      Alert.alert('Sucesso', 'Senha deletada!');
      setDeleteModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a senha.');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.header}>{passwordDetails.title}</Text>

        {/* Nome de Usuário */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            value={passwordDetails.email}
            editable={false}  // Torne editável conforme necessário
          />
        </View>

        {/* Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              value={passwordDetails.password}
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
            value={passwordDetails.description || 'Sem descrição'}
            multiline
            editable={false}  // Torne editável conforme necessário
          />
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setEditedDetails(passwordDetails);
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
              value={editedDetails.user}
              onChangeText={(text) => setEditedDetails({ ...editedDetails, user: text })}
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
