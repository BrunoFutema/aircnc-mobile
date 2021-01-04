import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Label } from './styles';

interface RouteParams {
  id: string;
}

const Book: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params as RouteParams;

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          date: Yup.string().required('Campo data obrigatório!'),
        });

        // await schema.validate(data, { abortEarly: false });

        const { date } = data;
        const user_id = await AsyncStorage.getItem('user');

        await api.post(
          `spots/${id}/bookings`,
          {
            date: '2020-12-21T09:30:35.000Z',
            user_id: '91e1481f-c171-4486-bd41-e5872973a37a',
          },
          { headers: { user_id: '91e1481f-c171-4486-bd41-e5872973a37a' } },
        );

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('Spots');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao solicitar a reserva',
          'Ocorreu um erro ao tentar solicitar sua reserva, tente novamente!',
        );
      }
    },
    [id, navigation],
  );

  const handleCancel = useCallback(() => {
    navigation.navigate('Spots');
  }, [navigation]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>DATA DE INTERESSE *</Label>

        <Input
          name="date"
          icon="calendar"
          placeholder="Qual data você quer reservar?"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Button onPress={() => formRef.current?.submitForm()}>
          Solicitar reserva
        </Button>

        <Button
          style={{ backgroundColor: '#ccc', marginTop: 10 }}
          onPress={handleCancel}
        >
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default Book;
