import React, { useCallback, useEffect, useRef } from 'react';
import { Platform, Image, TextInput, Alert } from 'react-native';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import { Container, Form, Label } from './styles';

interface SignInFormData {
  email: string;
  techs: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const techsInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Spots');
      }
    });
  }, [navigation]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido!'),
          techs: Yup.string().required(
            'Informe as tecnologias de seu interesse!',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { email, techs } = data;

        const response = await api.post('sessions', { email });

        const { id } = response.data;

        await AsyncStorage.setItem('user', id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('Spots');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao encontrar os spots',
          'Ocorreu um erro ao buscar os spots com essas tecnologias, tente encontrar outras tecnologias!',
        );
      }
    },
    [navigation],
  );

  return (
    <Container enabled={Platform.OS === 'ios'} behavior="padding">
      <Image source={logoImg} />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>SEU E-MAIL *</Label>

        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => techsInputRef.current?.focus()}
          name="email"
          icon="mail"
          placeholder="Seu e-mail"
        />

        <Label>TECNOLOGIAS *</Label>

        <Input
          ref={techsInputRef}
          autoCorrect={false}
          autoCapitalize="words"
          keyboardType="default"
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
          name="techs"
          icon="hash"
          placeholder="Tecnologias de interesse"
        />

        <Button onPress={() => formRef.current?.submitForm()}>
          Encontrar spots
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
