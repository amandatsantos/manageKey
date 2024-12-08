import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';

type InputProps = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
};

const Input = ({ value, placeholder, onChangeText, secureTextEntry = false, error }: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  error: { color: 'red', fontSize: 12 },
});

export default Input;
