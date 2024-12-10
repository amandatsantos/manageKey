import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    width: '100%',  // Garantir que o campo ocupe toda a largura
  },
  iconButton: {
    position: 'absolute',
    right: 10,  // Coloca o ícone à direita
    top: '30%',  // Alinha verticalmente ao meio
    transform: [{ translateY: -12 }],  // Ajuste fino para centralizar
    padding: 10,
  },
  link: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
  }
});
