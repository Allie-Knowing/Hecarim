import styled from "styled-components/native";

export const DefaultButtonStyle = styled.TouchableHighlight`
  border-radius: 1000px;
  outline: none;
  padding: 8px 16px;
`;

export const DefaultLabelStyle = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
`;
