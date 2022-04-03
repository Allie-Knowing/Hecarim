import styled from "styled-components/native";

export const Container = styled.View<{
  topPad: number;
}>`
  width: 100%;
  position: relative;
  height: ${({ topPad }) => 50 + topPad}px;
  flex-direction: row;
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

export const Setting = styled.Image<{ topPad: number }>`
  width: 20px;
  height: 20px;
  margin-top: ${({ topPad }) => topPad}px;
  margin-right: 20px;
`;
