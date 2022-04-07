import styled from "styled-components/native";

export const Container = styled.View<{
  topPad: number;
}>`
  width: 100%;
  position: relative;
  height: ${({ topPad }) => 30 + topPad}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const Box = styled.View`
  width: 40px;
`;

export const Title = styled.Text<{
  topPad: number;
}>`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.body2};
  margin-top: ${({ topPad }) => topPad}px;
`;