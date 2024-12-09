import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../components/scrennWrapper'; // Componente Layout
import globalStyles from '../styles'; // Estilos globais

const ViewProfile = () => {
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const userProfile = JSON.parse(storedUser);
        setProfile(userProfile);
      }
    };
    loadProfile();
  }, []);

  return (
    <ScreenWrapper>
      <Text style={globalStyles.header}>Perfil</Text>
      {profile ? (
        <>
          <Text style={globalStyles.profileText}>Nome: {profile.name}</Text>
          <Text style={globalStyles.profileText}>E-mail: {profile.email}</Text>
        </>
      ) : (
        <Text style={globalStyles.text}>Nenhum perfil encontrado.</Text>
      )}
    </ScreenWrapper>
  );
};

export default ViewProfile;