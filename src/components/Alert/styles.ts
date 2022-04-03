import styled from "styled-components/native";

export const Container = styled.View`
  border-radius: 10;
  padding-top: 20;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  margin-bottom: 8;
`;

export const Content = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  margin-bottom: 16;
`;

export const ButtonContainer = styled.View`
  display: flex;
`;

export const Button = styled.TouchableHighlight`
  flex: 1;
  padding: 15 0;
`;

export const ButtonLabel = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  text-align: center;
  width: 100%;
`;
