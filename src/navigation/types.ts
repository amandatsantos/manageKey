// src/navigation/types.ts
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgetPassword: undefined;
    Home: undefined;

  };
  
  export type HomeStackParamList = {
    Home: undefined;
    Details: { id: string }; // Exemplo de tela com parâmetro
    ViewPasswords: undefined;
    ViewProfile :undefined;
    CreatePassword: undefined;

  };
  