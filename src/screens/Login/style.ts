import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  width: 100%;
  flex: 1;
`;

export const Content = styled.View<{
  height: number;
}>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  justify-content: center;
  margin-left: 20px;
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.h1};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const LoginBtnContainer = styled.View`
  width: 100%;
  margin-top: 48px;
`;

export const LoginDescription = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale60};
`;
