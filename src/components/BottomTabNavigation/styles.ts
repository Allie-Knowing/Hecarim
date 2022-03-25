import styled from "styled-components/native";

export const Label = styled.Text`
  font: ${({ theme }) => theme.fonts.description2};
  margin-top: 4px;
`;

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  padding: 6px 0px;
  z-index: 2;
`;
