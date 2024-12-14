import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/types';
import { useAuth } from '../../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../ViewPassword/style';

const ViewPasswords = () => {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState<{ id: string; title: string; password: string; description: string; userId: string; nickname:string }[]>([]);
  const [search, setSearch] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState(passwords);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList, 'ViewPasswords'>>();

  // Função para carregar as senhas
  const loadPasswords = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      const passwordsList = storedPasswords ? JSON.parse(storedPasswords) : [];
      const userPasswords = passwordsList.filter((password: { userId: string; }) => password.userId === user.id);
  
      // Evitar atualizações desnecessárias:
      if (JSON.stringify(userPasswords) !== JSON.stringify(passwords)) {
        setPasswords(userPasswords);
        setFilteredPasswords(userPasswords);
      }
    } catch (error) {
      console.error('Erro ao carregar senhas:', error);
    }
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

  const handleNavigateToDetails = (item: {
    nickname: any; id: string; title: string; password: string; description: string; userId: string 
}) => {
    if (user) {
      const passwordDetails = { ...item, email: user.email , nickname: item.nickname };
      navigation.navigate('DetailsPassword', { passwordDetails });
    } else {
      console.warn('Usuário não está logado.');
    }
  };

  const renderItem = ({ item }: { item: { id: string; title: string; password: string; description: string; userId: string;  nickname: string} }) => (
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Botão de Adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (user) {
            navigation.navigate('CreatePassword');
          } else {
            console.warn('Usuário não está logado.');
          }
        }}
      >
        <Ionicons name="add-outline" size={24} color="#fff" accessible={true} accessibilityLabel="Adicionar nova senha" />
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default ViewPasswords;