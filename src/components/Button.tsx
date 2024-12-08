// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from './ButtonStyles'; // Importando o estilo específico

const Button = ({ title, onPress, style }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyles.primaryButton, style]}>
      <Text style={{ color: '#fff' }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
