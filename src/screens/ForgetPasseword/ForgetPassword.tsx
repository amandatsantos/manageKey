import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../../contexts/AuthContext'; // Importando o contexto
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../components/scrennWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomModal from '../../components/Modal';
import globalStyles from '../../styles';
import { forgetPasswordValidation } from '../../utils/validations'; // Validação separada

const ForgetPassword = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { resetPassword } = useAuth(); // Função para resetar a senha

  // Função para resetar a senha e exibir a senha gerada
  const handlePasswordReset = async (values: { email: string }) => {
    const tempPassword = generateTemporaryPassword();
    
    // Resetar a senha utilizando o método do AuthContext
    const success = await resetPassword(values.email, tempPassword);
    if (success) {
      setNewPassword(tempPassword);
      setModalVisible(true);
    } else {
      alert('Usuário não encontrado!');
    }
  };

  // Função para gerar senha temporária
  const generateTemporaryPassword = () => {
    let password = '';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    // Garante que a senha tenha pelo menos uma letra maiúscula
    password += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];

    // Garante que a senha tenha pelo menos 6 caracteres no total
    while (password.length < 6) {
      const allCharacters = lowerCaseLetters + upperCaseLetters + numbers;
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Embaralha a senha para garantir que a letra maiúscula não esteja sempre na primeira posição
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
  };

  return (
    <ScreenWrapper>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgetPasswordValidation} // Validação importada
        onSubmit={handlePasswordReset}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={globalStyles.container}>
            <Text style={globalStyles.label}>E-mail</Text>
            <Input
              onChangeText={handleChange('email')}
              value={values.email}
              placeholder="Digite seu e-mail"
              error={touched.email && errors.email}
            />

            <Button title="Recuperar Senha" onPress={handleSubmit} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={globalStyles.link}>Voltar ao Login</Text>
            </TouchableOpacity>

            <CustomModal
              visible={modalVisible}
              title="Nova Senha Gerada"
              message={`Sua nova senha temporária é: ${newPassword}`}
              onClose={() => {
                setModalVisible(false);
                navigation.navigate('Login');
              }}
            />
          </View>
        )}
      </Formik>
    </ScreenWrapper>
  );
};

export default ForgetPassword;
