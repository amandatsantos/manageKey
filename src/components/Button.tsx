import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D1E3DD', // Fundo claro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Borda arredondada
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#333', // Texto escuro
    fontSize: 16,
    fontWeight: 'bold',
  },
   buttonContainer: {
    width: '100%',
    alignItems: 'center',
  }
});

export default Button;
