import styled from "styled-components";
import { DefaultButtonStyle } from "../styles";

export const Button = styled(DefaultButtonStyle)`
  background-color: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  border: 0;

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.click};
  }
`;
