import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
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
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
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
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#6c6772',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  deleteButton: {
    backgroundColor: '#D1E3DD',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    
  },

  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
   backgroundColor: '#D1E3DD',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#32292f',
    fontSize: 16,
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
    color: '#D1E3DD',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#32292F',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    color: '#32292F',
  },

  whiteButton: {
    backgroundColor: '#D1E3DD',
  },
  darkText: {
    color: '#32292F',
  },

});
