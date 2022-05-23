import styled from "styled-components/native";

export const Container = styled.View<{
  height: number;
}>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.subtitle2};
  margin-top: 16px;
  margin-left: 20px;
`;

export const QuestionContainer = styled.FlatList`
  width: 100%;
  margin-top: 12px;
  height: 500px;
`;

export const Notice = styled.Text`
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;
