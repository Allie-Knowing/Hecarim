import styled from "styled-components/native";

export const Input = styled.TextInput`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  padding: 8px 16px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
  border-radius: 10px;
  outline-width: 0px;
`;
