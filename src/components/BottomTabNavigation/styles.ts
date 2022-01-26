import styled from "styled-components/native";

export const Label = styled.Text<{ focused: boolean }>`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme, focused }) =>
    focused ? theme.colors.primary.default : theme.colors.grayscale.scale30};
`;
