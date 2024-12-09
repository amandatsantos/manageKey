import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import ScreenWrapper from '../../components/scrennWrapper';

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState<{ email: string; fullname: string; password: string } | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ email: '', fullname: '', password: '' });

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
    if (!editedProfile.fullname || !editedProfile.email || !editedProfile.password) {
      Alert.alert('Erro', 'Todos os campos precisam ser preenchidos.');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify(editedProfile));
      setProfile(editedProfile);
      setEditModalVisible(false);
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a conta.');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.header}>Perfil</Text>

        {/* Ícone de Usuário */}
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={80} color="#fff" />
        </View>

        {profile && (
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
                  setEditedProfile(profile);
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
        )}

        {/* Modal Editar */}
        <Modal
          visible={editModalVisible}
          animationType="slide"
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Editar Perfil</Text>

            <TextInput
              style={styles.input}
              value={editedProfile.email}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
              placeholder="Novo E-mail"
            />
            <TextInput
              style={styles.input}
              value={editedProfile.fullname}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, fullname: text })}
              placeholder="Novo Usuário"
            />
            <TextInput
              style={styles.input}
              value={editedProfile.password}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, password: text })}
              placeholder="Nova Senha"
              secureTextEntry
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

        {/* Modal Deletar */}
        <Modal
          visible={deleteModalVisible}
          animationType="slide"
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Excluir Conta</Text>
            <Text style={styles.modalText}>Tem certeza de que deseja excluir sua conta?</Text>

            <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
              <Text style={styles.buttonText}>Excluir Conta</Text>
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

export default Profile;