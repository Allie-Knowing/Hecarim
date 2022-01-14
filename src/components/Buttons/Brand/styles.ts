import styled from "styled-components/native";
import * as I from "../styles";

export const Container = styled(I.DefaultButtonStyle)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grayscale.scale30 : theme.colors.primary.default};
  border: 0;
`;

export const Label = styled(I.DefaultLabelStyle)`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;
