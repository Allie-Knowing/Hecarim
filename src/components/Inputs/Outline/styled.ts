import styled from "styled-components/native";

export const Input = styled.TextInput`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  padding: 8px 16px;
  border: solid 1px ${({ theme }) => theme.colors.grayscale.scale30};
  border-radius: 10px;
  outline-width: 0px;
`;
