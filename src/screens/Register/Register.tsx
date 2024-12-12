import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Formik } from 'formik';
import ScreenWrapper from '../../components/scrennWrapper';
import Button from '../../components/Button';
import Input from '../../components/Input';
import globalStyles from '../../styles';
import { registerSchema } from '../../utils/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import style from '../Register/style';


const Register = ({ navigation }: any) => {
  const { register } = useAuth();  // Obter a função register do contexto

  const [passwordVisible, setPasswordVisible] = useState(false);  // Estado para controlar visibilidade da senha
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);  // Estado para confirmar a visibilidade da senha

  const handleRegister = async (values: { email: string; password: string; confirmPassword: string; fullname: string }) => {
    // Verificando se as senhas coincidem
    if (values.password !== values.confirmPassword) {
      alert('As senhas não coincidem. Tente novamente.');
      return;
    }

    // Realizando o registro via AuthContext
    const success = await register(values.email, values.password, values.fullname);

    if (success) {
      alert('Registro bem-sucedido!');
      navigation.navigate('Login');  // Redireciona para o login
    } else {
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <ScreenWrapper>

<Image source={require('../../../assets/imagens/iconApp.png')}style={style.logo}/>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', fullname: '' }}
        validationSchema={registerSchema}  // Usando esquema de validação
        onSubmit={handleRegister}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={globalStyles.container}>
            <Text style={globalStyles.label}>Nome Completo</Text>
            <Input
              onChangeText={handleChange('fullname')}
              value={values.fullname}
              placeholder="Digite seu nome completo"
              error={touched.fullname && errors.fullname}
            />

            <Text style={globalStyles.label}>E-mail</Text>
            <Input
              onChangeText={handleChange('email')}
              value={values.email}
              placeholder="Digite seu e-mail"
              error={touched.email && errors.email}
            />

<Text style={globalStyles.label}>Senha</Text>
<View style={style.inputContainer}>
  <Input
    onChangeText={handleChange('password')}
    value={values.password}
    placeholder="Digite sua senha"
    secureTextEntry={!passwordVisible}
    error={touched.password && errors.password}
    style={style.input}  // Usando o mesmo estilo de input
  />
  <TouchableOpacity
    onPress={() => setPasswordVisible(!passwordVisible)}
    style={style.iconButton}
  >
    <Ionicons
      name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
      size={20}
      color="#6c6772"  // Mudando a cor do ícone para casar com o background
    />
  </TouchableOpacity>
</View>

<Text style={globalStyles.label}>Confirmação de Senha</Text>
<View style={style.inputContainer}>
  <Input
    onChangeText={handleChange('confirmPassword')}
    value={values.confirmPassword}
    placeholder="Confirme sua senha"
    secureTextEntry={!confirmPasswordVisible}
    error={touched.confirmPassword && errors.confirmPassword}
    style={style.input}  // Usando o mesmo estilo de input
  />
  <TouchableOpacity
    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
    style={style.iconButton}
  >
    <Ionicons
      name={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
      size={20}
      color="#6c6772"  // Mudando a cor do ícone para casar com background
    />
  </TouchableOpacity>
</View>

<Button title="Registrar" onPress={handleSubmit} />

<TouchableOpacity onPress={() => navigation.navigate('Login')}>
  <Text style={globalStyles.link}>Já possui uma conta? Faça login</Text>
</TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScreenWrapper>
  );
};

export default Register;

