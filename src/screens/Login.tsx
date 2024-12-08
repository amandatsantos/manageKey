import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import CustomModal from '../components/Modal';
import * as Yup from 'yup'; // Importando o Yup para validação

// Validação de email e senha com Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});

const Login = ({ navigation }: any) => {
  const { login } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  const handleLogin = async (values: { email: string; password: string }) => {
    const success = await login(values.email, values.password);
    setModalMessage(success ? 'Login realizado com sucesso!' : 'Dados inválidos!');
    setModalVisible(true);

    if (success) {
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Home');
      }, 2000);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema} // Usando o schema de validação do Yup
      onSubmit={handleLogin}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Input
            value={values.email}
            placeholder="E-mail"
            onChangeText={handleChange('email')}
            error={touched.email && errors.email} // Mostra o erro se houver
          />
          <Input
            value={values.password}
            placeholder="Senha"
            onChangeText={handleChange('password')}
            secureTextEntry
            error={touched.password && errors.password} // Mostra o erro se houver
          />
          <Button title="Entrar" onPress={handleSubmit} /> {/* Chama handleSubmit do Formik */}
          <Button title="Registrar" onPress={() => navigation.navigate('Register')} />

          <CustomModal
            visible={modalVisible}
            title="Atenção"
            message={modalMessage}
            onClose={() => setModalVisible(false)}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
});

export default Login;
