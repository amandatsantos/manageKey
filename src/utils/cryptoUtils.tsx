// src/utils/cryptoUtils.ts
import { randomBytes, createCipheriv, createDecipheriv } from 'react-native-crypto'; // Usando react-native-crypto

const algorithm = 'aes-256-cbc'; // Algoritmo de criptografia

// Função para gerar chave e IV
export const generateKeyAndIV = () => {
  return {
    key: randomBytes(32), // Gera chave aleatória de 256 bits
    iv: randomBytes(16), // Gera IV aleatório de 128 bits
  };
};

// Função para criptografar os dados
export const encryptData = (data: string, key: Uint8Array, iv: Uint8Array): string => {
  try {
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Erro ao criptografar dados:', error);
    return '';
  }
};

// Função para descriptografar os dados
export const decryptData = (data: string, key: Uint8Array, iv: Uint8Array): string => {
  try {
    const [ivString, encryptedData] = data.split(':');
    const decipher = createDecipheriv(algorithm, key, Buffer.from(ivString, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  } catch (error) {
    console.error('Erro ao descriptografar dados:', error);
    return '';
  }
};
