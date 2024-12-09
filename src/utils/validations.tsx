import * as Yup from 'yup';

// Validação de Email
export const validatePassword = Yup.string()
  .min(6, 'A senha deve ter pelo menos 6 caracteres')
  .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
  .matches(/^[a-zA-Z0-9]*$/, 'A senha não pode conter caracteres especiais')
  .required('A senha é obrigatória');
  
// Validação de email
export const validateEmail = Yup.string()
  .email('Formato de e-mail inválido')
  .required('O e-mail é obrigatório');

// Validação da confirmação de senha
export const validateConfirmPassword = Yup.string()
  .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
  .required('A confirmação de senha é obrigatória');
  
export const validateFullname = Yup.string()
  .required('O nome completo é obrigatório');
// Esquema de Validação para Login
export const loginSchema = Yup.object().shape({
  email: validateEmail,
  password: validatePassword,
});

// Esquema de Validação para Registro
export const registerSchema = Yup.object().shape({
  fullname: validateFullname,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
});

export const forgetPasswordValidation = Yup.object({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
});