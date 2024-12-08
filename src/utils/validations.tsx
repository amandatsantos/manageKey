import * as Yup from 'yup';

export const validateEmail = Yup.string().email('E-mail inválido').required('E-mail é obrigatório');
export const validatePassword = Yup.string()
  .min(6, 'A senha deve ter no mínimo 6 caracteres')
  .matches(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula')
  .matches(/[0-9]/, 'A senha deve conter ao menos um número')
  .required('Senha é obrigatória');
export const validateConfirmPassword = Yup.string()
  .oneOf([Yup.ref('password')], 'As senhas devem coincidir')
  .required('Confirmação de senha é obrigatória');
