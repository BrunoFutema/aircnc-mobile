/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../Button';

import api from '../../services/api';

import {
  Container,
  Title,
  Bold,
  Item,
  Thumbnail,
  Company,
  Price,
} from './styles';

interface SpotListProps {
  tech: string | string[];
}

interface ISpot {
  id: string;
  company: string;
  thumbnail: string;
  price: number;
}

const SpotList: React.FC<SpotListProps> = ({ tech }) => {
  const [spots, setSpots] = useState<ISpot[]>([]);

  const navigation = useNavigation();

  const handleNavigate = useCallback(
    (id: string) => {
      navigation.navigate('Book', { id });
    },
    [navigation],
  );

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get<ISpot[]>('spots', {
        params: { techs: tech },
      });

      response.data.map(spot => {
        spot.thumbnail = `https://dev-bfutema-portfolio.com.br/air-cnc-files/${spot.thumbnail}`;
      });

      setSpots(response.data);
    }

    loadSpots();
  }, [tech]);

  return (
    <Container>
      <Title>
        Empresas que utilizam <Bold>{tech}</Bold>
      </Title>

      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={spots}
        keyExtractor={spot => spot.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Item>
            <Thumbnail
              style={{ resizeMode: 'cover' }}
              source={{ uri: item.thumbnail }}
            />

            <Company>{item.company}</Company>

            <Price>{item.price ? `R$ ${item.price}/dia` : 'Gratuito'}</Price>

            <Button
              style={{ marginTop: 15 }}
              onPress={() => handleNavigate(item.id)}
            >
              Solicitar Reserva
            </Button>
          </Item>
        )}
      />
    </Container>
  );
};

export default SpotList;
