import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', // Alinha elementos horizontalmente ao centro
      justifyContent: 'center', // Alinha elementos verticalmente ao centro
      padding: 20,
    },
    title: {
      fontSize: 18,
      color: '#FFFFFF', // Branco para contraste
      marginBottom: 8,
      fontFamily: 'Roboto',
    },
    appName: {
      fontSize: 28,
      color: '#6495ED', // Azul para o nome do app
      fontWeight: 'bold',
      marginBottom: 20,
    },
    icon: {
      width: 120,
      height: 120,
      marginBottom: 40,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    loginButton: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 25,
      marginTop: 20,
    },
    loginText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  