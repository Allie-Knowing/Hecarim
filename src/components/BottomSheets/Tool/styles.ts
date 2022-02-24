import styled from "styled-components/native";

export const Button = styled.TouchableHighlight`
  padding: 20px 0px;
  justify-content: center;
  border: solid 0px ${({ theme }) => theme.colors.grayscale.scale30};
`;

export const Label = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font: ${({ theme }) => theme.fonts.body2};
  text-align: center;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
`;

export const Pad = styled.View`
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
`;
