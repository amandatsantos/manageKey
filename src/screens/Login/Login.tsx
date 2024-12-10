import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomModal from '../../components/Modal';
import ScreenWrapper from '../../components/scrennWrapper';
import globalStyles from '../../styles';
import { loginSchema } from '../../utils/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import style from './style';  // Certifique-se de que o estilo está sendo importado corretamente

const Login = ({ navigation }: any) => {
  const { login } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);  // Estado para controlar a visibilidade da senha

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const success = await login(values.email, values.password);
      setModalMessage(success ? 'Login realizado com sucesso!' : 'Dados inválidos!');
      setModalVisible(true);

      if (success) {
        await AsyncStorage.removeItem('user');
        setTimeout(() => {
          setModalVisible(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }, 2000);
      }
    } catch (error) {
      setModalMessage('Ocorreu um erro. Tente novamente mais tarde.');
      setModalVisible(true);
      console.error('Erro de login:', error);
    }
  };

  return (
    <ScreenWrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={globalStyles.container}>
            <Text style={globalStyles.label}>E-mail</Text>
            <Input
              value={values.email}
              placeholder="Digite seu e-mail"
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
            />

            <Text style={globalStyles.label}>Senha</Text>
            <View style={style.inputContainer}>
              <Input
                value={values.password}
                placeholder="Digite sua senha"
                onChangeText={handleChange('password')}
                secureTextEntry={!passwordVisible}
                error={touched.password && errors.password}
                style={style.input}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={style.iconButton}
              >
                <Ionicons
                  name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#FFA500"  // Cor personalizada
                />
              </TouchableOpacity>
            </View>

            <Button title="Confirmar" onPress={handleSubmit} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={globalStyles.link}>Não tem cadastro? Registre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={globalStyles.link}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <CustomModal
              visible={modalVisible}
              title="Atenção"
              message={modalMessage}
              onClose={() => setModalVisible(false)}
            />
          </View>
        )}
      </Formik>
    </ScreenWrapper>
  );
};

export default Login;
