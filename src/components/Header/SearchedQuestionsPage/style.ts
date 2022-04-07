import styled from "styled-components/native";

export const Container = styled.View<{
  topPad: number;
}>`
  width: 100%;
  position: relative;
  height: ${({ topPad }) => 30 + topPad}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const BackIcon = styled.Image<{
  topPad: number;
}>`
  width: 10px;
  height: 18px;
  margin-left: 20px;
  margin-top: ${({ topPad }) => topPad - 10 }px;
`;

export const Title = styled.Text<{
  topPad: number;
}>`
  width: 60%;
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.body2};
  margin-top: ${({ topPad }) => topPad - 6 }px;
`;
