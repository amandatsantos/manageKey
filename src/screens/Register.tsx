import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Formik } from 'formik';
import { validateEmail, validatePassword, validateConfirmPassword } from '../utils/validations';
import * as Yup from 'yup';

const Register = ({ navigation }: any) => {
  const { register } = useAuth();

  const handleRegister = async (values: { email: string; password: string; confirmPassword: string }) => {
    const success = await register(values.email, values.password);
    if (success) {
      alert('Registro bem-sucedido!');
      navigation.navigate('Login');
    } else {
      alert('Erro ao registrar. Tente novamente.');
    }
  };
  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        email: validateEmail,
        password: validatePassword,
        confirmPassword: validateConfirmPassword,
      })}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            value={values.email}
            placeholder="Digite seu e-mail"
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            value={values.password}
            placeholder="Digite sua senha"
            secureTextEntry
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <Text>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('confirmPassword')}
            value={values.confirmPassword}
            placeholder="Confirme sua senha"
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}

          <Button title="Registrar" onPress={handleSubmit as any} />
          <Button title="Já possui uma conta? Faça login" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8 },
  error: { color: 'red', marginBottom: 10 },
});

export default Register;
