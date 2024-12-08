// src/screens/Details.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';

type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'Details'>;

const Details = ({ route }: { route: DetailsScreenRouteProp }) => {
  const { id } = route.params;

  return (
    <View>
      <Text>Detalhes do item: {id}</Text>
    </View>
  );
};

export default Details;
