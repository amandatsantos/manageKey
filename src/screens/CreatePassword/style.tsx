import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#D1E3DD',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#D1E3DD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  descriptionInput: {
    height: 120, // Aumentando o tamanho da descrição
    textAlignVertical: 'top', // Alinha o texto no topo
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaçamento igual entre os botões
    marginTop: 24,
  },
  button: {
    width: 40, // Largura fixa para os botões
    height: 40, // Altura fixa para os botões
    borderRadius: 5, // Tornando os botões circulares
    backgroundColor: '#D1E3DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 24, // Tamanho do ícone (seta e check)
    color: '#000',
  },
});
