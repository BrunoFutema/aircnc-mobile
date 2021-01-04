import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Form = styled(Unform)`
  align-self: stretch;
  padding: 0 30px;
  margin-top: 30px;
`;

export const Label = styled.Text`
  color: #444;
  font-weight: bold;
  margin-bottom: 8px;
`;
