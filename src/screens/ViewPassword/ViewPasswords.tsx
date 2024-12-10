import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/types';
import { useAuth } from '../../contexts/AuthContext';  // Para acessar o usuário logado
import { useFocusEffect } from '@react-navigation/native'; // Hook para atualizar a tela quando voltar

import styles from '../ViewPassword/style';

const ViewPasswords = () => {
  const { user } = useAuth();  // Obtém o usuário logado
  const [passwords, setPasswords] = useState<{ title: string; password: string; description: string; user?: string }[]>([]);
  const [search, setSearch] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState(passwords);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList, 'ViewPasswords'>>();

  // Função para carregar as senhas
  const loadPasswords = async () => {
    const storedPasswords = await AsyncStorage.getItem('passwords');
    const passwordsList = storedPasswords ? JSON.parse(storedPasswords) : [];
    
    // Filtra as senhas para mostrar apenas as do usuário logado
    const userPasswords = passwordsList.filter((password: any) => password.userId === user.id);
    setPasswords(userPasswords);
    setFilteredPasswords(userPasswords);  // Inicialmente, exibe todas as senhas do usuário
  };

  // Usando useFocusEffect para garantir que as senhas sejam recarregadas sempre que a tela for acessada
  useFocusEffect(() => {
    loadPasswords();
  });

  // Filtrar senhas conforme a pesquisa
  useEffect(() => {
    if (search.trim()) {
      setFilteredPasswords(
        passwords.filter((password) =>
          password.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredPasswords(passwords);
    }
  }, [search, passwords]);

  const handleNavigateToDetails = (item: { title: string; password: string; description: string; user?: string }) => {
    console.log('Navegando para detalhes com:', item);  // Verifique se está saindo o item corretamente
    navigation.navigate('DetailsPassword', { passwordDetails: item });
  };

  const renderItem = ({ item }: { item: { title: string; password: string; description: string; user?: string } }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleNavigateToDetails(item)}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#000" />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      {/* Campo de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar ..."
          placeholderTextColor="#c0c0c0"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search-outline" size={20} color="#000" style={styles.searchIcon} />
      </View>

      {/* Lista de Senhas */}
      <FlatList
        data={filteredPasswords}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />

      {/* Botão de Adicionar */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreatePassword')}>
        <Ionicons name="add-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default ViewPasswords;
