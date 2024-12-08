// src/styles.ts
import { StyleSheet } from 'react-native';

const colors = {
    primary: '#007BFF',
    secondary: '#ccc',
    white: '#fff',
    black: '#000',
  };
  
  const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.secondary,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
    },
  });
  
  export { globalStyles, colors };
  