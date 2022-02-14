import styled from "styled-components/native";

export const Label = styled.Text<{ focused: boolean }>`
  font: ${({ theme }) => theme.fonts.description2};
  color: ${({ theme, focused }) =>
    focused ? theme.colors.primary.default : theme.colors.grayscale.scale30};
  margin-top: 4px;
`;

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  padding: 6px 0px;
  z-index: 100;
`;
