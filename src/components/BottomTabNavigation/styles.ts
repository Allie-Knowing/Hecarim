import styled from "styled-components/native";

export const Label = styled.Text<{ focused: boolean }>`
  font: ${({ theme }) => theme.fonts.description2};
  color: ${({ theme, focused }) =>
    focused ? theme.colors.primary.default : theme.colors.grayscale.scale30};
  margin-top: 2px;
`;
