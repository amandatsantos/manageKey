// src/navigation/types.ts
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    Welcome: undefined;
    Home: undefined;
    Details: { id: string }; // Exemplo de tela com parâmetro
  };
  
  export type HomeStackParamList = {
    Home: undefined;
    Details: { id: string }; // Exemplo de tela com parâmetro
  };
  