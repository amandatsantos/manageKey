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
        width: '100%',  // Garante que o campo de input tenha 100% da largura disponível
      },
      iconButton: {
        position: 'absolute',  // O ícone ficará posicionado de forma absoluta dentro do container
        right: 10,  // Fica alinhado à direita do input
        top: '30%',  // Fica centralizado verticalmente
        transform: [{ translateY: -12 }],  // Ajuste para centralizar exatamente
        padding: 10,
      },
      link: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 15,
      },
      logo: {
        width: 100, // Ajuste o tamanho conforme necessário
        height: 100,
        alignSelf: 'center', // Centraliza a imagem horizontalmente
        marginBottom: 20, // Espaçamento abaixo da imagem
        marginTop: 50, // Adiciona espaço acima da logo
      },
      
    });
    
 
