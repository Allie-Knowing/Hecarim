import styled from "styled-components/native";

export const ButtonWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 53px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  display: flex;
  justify-content: center;
  padding-left: 20px;
  margin-top: 10px;
`;

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.body3};
`;

export const ButtonTitleRed = styled.Text`
  color: ${({ theme }) => theme.colors.red.default};
  font: ${({ theme }) => theme.fonts.body3};
`;
