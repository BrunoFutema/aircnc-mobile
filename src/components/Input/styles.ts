import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 44px;
  border-width: 1px;
  border-color: #ddd;
  padding: 0 16px;
  margin-bottom: 20px;
  border-radius: 2px;

  flex-direction: row;
  align-items: center;

  border-width: 2px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #f05a5b;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #5c5c5c;
    `}
`;

export const TextInput = styled.TextInput`
  font-size: 16px;
  color: #444;
  margin-left: 8px;
`;
