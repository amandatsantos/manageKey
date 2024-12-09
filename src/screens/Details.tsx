// src/screens/Details.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';
import ScreenWrapper from '../components/scrennWrapper';

type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'Details'>;

const Details = ({ route }: { route: DetailsScreenRouteProp }) => {
  const { id } = route.params;

  return (
    <ScreenWrapper>
    <View>
      <Text>Detalhes do item: {id}</Text>
    </View>
    </ScreenWrapper>
  );
};

export default Details;
