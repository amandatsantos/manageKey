// src/screens/Home.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View>
      <Text>Bem-vindo à Home!</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Details', { id: '123' })}
      />
    </View>
  );
};

export default Home;
