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
`;

export const Title = styled.Text`
  margin-left: 20px;
  font: ${({ theme }) => theme.fonts.h1};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const LoginBtnContainer = styled.View`
  width: 100%;
  margin-left: 20px;
  margin-top: 48px;
`;

export const LoginDescription = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale60};
`;

export const TermsContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 10;
  left: 0;
`;

export const LoginTermsBox = styled.Text`
  width: 100%;
  text-align: center;
  font: ${({ theme }) => theme.fonts.description2};
  color: ${({ theme }) => theme.colors.grayscale.scale60};
`;

export const TermsPoint = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;