import styled from "styled-components/native";

export const IQHistoryContainer = styled.View`
  width: 100%;
  margin-top: 56px;
  padding: 0px 20px;
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const IQHistoryList = styled.FlatList`
  margin-top: 30px;
  height: 300px;
`;
