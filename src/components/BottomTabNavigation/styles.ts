import styled from "styled-components/native";
import { Image } from "react-native";

export const Label = styled.Text<{ focused: boolean }>`
  font: ${({ theme }) => theme.fonts.description2};
  color: ${({ theme, focused }) =>
    focused ? theme.colors.primary.default : theme.colors.grayscale.scale30};
  margin-top: 2px;
`;

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  row-gap: 2px;
`;
