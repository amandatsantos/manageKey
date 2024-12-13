import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import ScreenWrapper from '../../components/scrennWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomModal from '../../components/Modal';
import globalStyles from '../../styles';
import { forgetPasswordValidation } from '../../utils/validations';
import style from './style';

const ForgetPassword = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { resetPassword } = useAuth();

  const handlePasswordReset = async (values: { email: string }) => {
    const tempPassword = generateTemporaryPassword();
    const success = await resetPassword(values.email, tempPassword);
    if (success) {
      setNewPassword(tempPassword);
      setModalVisible(true);
    } else {
      alert('Usuário não encontrado!');
    }
  };

  const generateTemporaryPassword = () => {
    let password = '';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    password += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
    while (password.length < 6) {
      const allCharacters = lowerCaseLetters + upperCaseLetters + numbers;
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  return (
    <ScreenWrapper>
      <Image source={require('../../../assets/imagens/iconApp.png')} style={style.logo} />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgetPasswordValidation}
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
