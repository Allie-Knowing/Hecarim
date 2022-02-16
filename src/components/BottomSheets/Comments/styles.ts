import styled from "styled-components/native";

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const Container = styled.View`
  padding: 10px 20px;
`;
