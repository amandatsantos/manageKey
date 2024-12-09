import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Formik } from 'formik';
import ScreenWrapper from '../../components/scrennWrapper';
import Button from '../../components/Button';
import Input from '../../components/Input';
import globalStyles from '../../styles'; // Estilos globais
import { registerSchema } from '../../utils/validations'; // Importação do esquema de validação

const Register = ({ navigation }: any) => {
  const { register } = useAuth();

  // Função para lidar com o registro
  const handleRegister = async (values: { email: string; password: string; confirmPassword: string; fullname: string }) => {
    const success = await register(values.email, values.password, values.fullname);
    if (success) {
      alert('Registro bem-sucedido!');
      navigation.navigate('Login');
    } else {
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <ScreenWrapper>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', fullname: '' }}
        validationSchema={registerSchema} // Esquema de validação importado
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
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder="Digite sua senha"
              secureTextEntry
              error={touched.password && errors.password}
            />

            <Text style={globalStyles.label}>Confirmação de Senha</Text>
            <Input
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Confirme sua senha"
              secureTextEntry
              error={touched.confirmPassword && errors.confirmPassword}
            />

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
