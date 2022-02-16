import styled from "styled-components/native";

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-bottom: 8px;
`;

export const Container = styled.View`
  padding: 10px 20px;
  padding-bottom: 0px;
  height: 80%;
`;

export const Scroll = styled.ScrollView``;

export const ScrollInner = styled.TouchableWithoutFeedback``;

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  height: 20%;
`;
