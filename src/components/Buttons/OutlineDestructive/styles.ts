import styled from "styled-components/native";
import * as I from "../styles";

export const Container = styled(I.DefaultButtonStyle)`
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  border: solid 1px
    ${({ theme, disabled }) =>
      disabled ? theme.colors.grayscale.scale30 : theme.colors.red.default};
`;

export const Label = styled(I.DefaultLabelStyle)`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grayscale.scale30 : theme.colors.red.default};
`;
