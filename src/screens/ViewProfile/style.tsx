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
  input: {
    backgroundColor: '#6c6772',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
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
    backgroundColor: '#ff6b6b',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  modalText: {
    color: '#fff',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
  },
  
});
