// src/navigation/types.ts
export type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  DetailsPassword: {
    passwordDetails: {
      nickname: string | undefined;
      id: any;
      title: string;
      password: string;
      description: string;
      user?: string;
    };
  };
  ViewPasswords: undefined;
  ViewProfile: {
    id: string;
    email: string;
    fullname: string;
    password: string;
  };
  CreatePassword: {
    // Adicionando o tipo para a criação de senha, se necessário
    passwordData: {
      title: string;
      password: string;
      description: string;
    };
  };
};
