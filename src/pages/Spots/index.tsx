import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Alert, ScrollView } from 'react-native';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';

import SpotList from '../../components/SpotList';

import logoImg from '../../assets/logo.png';

import { Container, Logo } from './styles';

const Spots: React.FC = () => {
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = io('https://dev-bfutema-portfolio.com.br', {
        query: { user_id },
      });

      socket.on(
        'booking_response',
        (booking: { spot: { company: any }; date: any; approved: boolean }) => {
          console.log(booking);
          Alert.alert(
            `Sua reserva em ${booking.spot.company} em ${format(
              new Date(booking.date),
              'dd/MM/yyyy',
            )} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`,
          );
        },
      );
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      if (storageTechs) {
        const techsArray = storageTechs.split(',').map(tech => tech.trim());

        setTechs(techsArray);
      }
    });
  }, []);

  return (
    <Container>
      <Logo style={{ resizeMode: 'contain' }} source={logoImg} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Spots;
