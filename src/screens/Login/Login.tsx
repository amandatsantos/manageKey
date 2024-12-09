import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomModal from '../../components/Modal';
import ScreenWrapper from '../../components/scrennWrapper';
import globalStyles from '../../styles';
import { loginSchema } from '../../utils/validations';

const Login = ({ navigation }: any) => {
  const { login, setIsAuthenticated } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  const handleLogin = async (values: { email: string; password: string }) => {
    const success = await login(values.email, values.password);
    setModalMessage(success ? 'Login realizado com sucesso!' : 'Dados inválidos!');
    setModalVisible(true);

    if (success) {
      setIsAuthenticated(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Details' }],
        });
      }, 2000);
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
            <Input
              value={values.password}
              placeholder="Digite sua senha"
              onChangeText={handleChange('password')}
              secureTextEntry
              error={touched.password && errors.password}
            />
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
