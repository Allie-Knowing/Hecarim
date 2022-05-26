import styled from "styled-components/native";

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  border-radius: 5px;
  font: ${({ theme }) => theme.fonts.description2};
  padding-left: 15px;
`;
