import styled from "styled-components/native";

export const Container = styled.FlatList`
  flex: 1;
  position: relative;
  top: 0px;
  left: 0px;
`;

export const Message = styled.View`
  background-color: ${({ theme }) => theme.colors.grayscale.scale100};
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale50};
`;
