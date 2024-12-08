import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar dados no AsyncStorage
export const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

// Recuperar dados do AsyncStorage
export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
  }
};

// Remover dados do AsyncStorage
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover dados:', error);
  }
};
