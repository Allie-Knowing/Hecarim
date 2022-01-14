import { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { LabelProps } from "..";
import * as I from "../styles";

export const Container = styled(I.DefaultButtonStyle)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grayscale.scale30 : theme.colors.red.default};
  border: 0;
`;

export const Label = styled(I.DefaultLabelStyle)`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;
