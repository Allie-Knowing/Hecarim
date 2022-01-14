import styled from "styled-components/native";

export const Input = styled.TextInput`
  padding: 0;
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  border: 0;
  outline-width: 0px;
`;

export const Line = styled.View`
  height: 1px;
  margin-top: 2px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale30};
`;

export const Container = styled.View`
  flex-direction: column;
`;
