import styled from "styled-components/native";

export const Input = styled.TextInput`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  border-radius: 5px;
  font: ${({ theme }) => theme.fonts.description1};
  padding: 12px 0px;
  padding-left: 15px;
  margin-top: 10px;
`;
