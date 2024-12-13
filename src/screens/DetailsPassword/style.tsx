import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#D1E3DD',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatar: {
    marginBottom: 16,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%', // Garantir que todos os inputs tenham o mesmo tamanho
    marginBottom: 16,
  },
  label: {
    color: '#D1E3DD',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#D1E3DD',
    borderRadius: 8,
    padding: 12,
    color: '#6c6772',
    width: '100%',  // Ajusta a largura do input
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',  // Garante que o container do campo de senha tenha a mesma largura
  },
  iconButton: {
    marginLeft: -40,
    padding: 10,
  },
 buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between', // Empurra os botões para os cantos
  alignItems: 'center',
  width: '100%', // Garante que ocupe toda a largura disponível
  paddingHorizontal: 25, // Adiciona espaçamento lateral
  marginTop: 16,
},

  button: {
    backgroundColor: '#D1E3DD',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  deleteButton: {
    backgroundColor: '#D1E3DD',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#32292F',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 20,
    color: '#D1E3DD'
  },
  buttonText: {
    color: '#32292f',
    fontSize: 16,
  },
  TextImput:{
    color:'#6c6772'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  

  
});
