import styled from "styled-components/native";

export const HeaderContainer = styled.View<{
  topPad: number;
}>`
  width: 100%;
  height: ${({ topPad }) => `${topPad + 50}px`};
  justify-content: center;
  align-items: center;
  padding-top: ${({ topPad }) => `${topPad}px`};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.body2};
`;
