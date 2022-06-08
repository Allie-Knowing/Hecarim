import styled from "styled-components/native";

export const Container = styled.ScrollView`
  width: 100%;
  margin-top: 5px;
`;

export const SelectPicker = styled.View`
  width: 100%;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  border-radius: 5px;
  margin-top: 10px;
  border-radius: 5px;
`;

export const Description = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale60};
  margin-top: 10px;
`;
