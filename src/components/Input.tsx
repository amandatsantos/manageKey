import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

interface InputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  error?: string | false;
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChangeText, secureTextEntry, label, error }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#292024"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#D1E3DD', // Cor clara para a label
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#292024', // Borda com cor clara
    borderRadius: 25, // Borda arredondada
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#e8f0ff', // Fundo claro
    color: '#292024', // Texto escuro
  },
  inputError: {
    borderColor: '#ff5c5c', // Cor vermelha para erros
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: '#ff5c5c', // Texto vermelho para erros
  },
});

export default Input;
