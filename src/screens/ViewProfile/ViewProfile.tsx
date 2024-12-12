import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import ScreenWrapper from '../../components/scrennWrapper';
import { useAuth } from '../../contexts/AuthContext';

const Profile = ({ navigation }) => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<{ email: string; fullname: string; password: string } | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    email: '',
    fullname: '',
    password: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setProfile(JSON.parse(storedUser));
      }
    };
    loadProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      // Se o campo de e-mail foi alterado, valide o novo e-mail
      if (editedProfile.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(editedProfile.email)) {
        Alert.alert('Erro', 'O e-mail fornecido é inválido.');
        return;
      }

      // Atualize apenas os campos que foram alterados
      const updatedProfile = {
        email: editedProfile.email || profile?.email || '',
        fullname: editedProfile.fullname || profile?.fullname || '',
        password: editedProfile.password || profile?.password || '',
      };

      await AsyncStorage.setItem('user', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setEditModalVisible(false);
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => setDeleteModalVisible(false),
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              // Exclui os dados do perfil do AsyncStorage
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('user_list');
              setProfile(null);  // Limpa o estado do perfil

              // Chama o logout para limpar o estado de autenticação
              logout();

              // Redireciona o usuário para a tela de login
              Alert.alert('Sucesso', 'Conta excluída com sucesso!');
              navigation.reset({ routes: [{ name: 'Login' }] }); // Redireciona para login
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a conta.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.header}>Perfil</Text>
  
        {/* Ícone de Usuário */}
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={80} color="#fff" />
        </View>
  
        {profile ? (  // Verifique se o profile está carregado antes de renderizar os campos
          <>
            {/* E-mail */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={profile.email}
                editable={false}
                placeholderTextColor="#c0c0c0"
              />
            </View>
  
            {/* Nome do Usuário */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Usuário</Text>
              <TextInput
                style={styles.input}
                value={profile.fullname}
                editable={false}
                placeholderTextColor="#c0c0c0"
              />
            </View>
  
            {/* Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  value={profile.password}
                  secureTextEntry={passwordVisible}
                  editable={false}
                  placeholderTextColor="#c0c0c0"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
  
            {/* Botões */}
            <View style={styles.buttonsContainer}>
              {/* Botão de Editar */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setEditedProfile({
                    email: profile.email,
                    fullname: profile.fullname,
                    password: profile.password,
                  });
                  setEditModalVisible(true);
                }}
              >
                <Ionicons name="create-outline" size={24} color="#fff" />
              </TouchableOpacity>
  
              {/* Botão de Deletar */}
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => setDeleteModalVisible(true)}
              >
                <Ionicons name="trash-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text >Carregando perfil...</Text>  // Mensagem de carregamento enquanto os dados não estão disponíveis
        )}
  
        {/* Modal de Edição */}
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Editar Perfil</Text>
  
              <TextInput
                style={styles.input}
                value={editedProfile.email}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
                placeholder="E-mail"
              />
              <TextInput
                style={styles.input}
                value={editedProfile.fullname}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, fullname: text })}
                placeholder="Nome de Usuário"
              />
              <TextInput
                style={styles.input}
                value={editedProfile.password}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, password: text })}
                placeholder="Senha"
                secureTextEntry={true}
              />
  
              <TouchableOpacity onPress={handleSaveChanges} style={styles.button}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
  
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.button}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
  
        {/* Modal de Exclusão */}
        <Modal
          visible={deleteModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Excluir Conta</Text>
              <Text style={styles.modalText}>Tem certeza de que deseja excluir sua conta?</Text>
  
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleDeleteAccount} style={styles.button}>
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

export default Profile;
