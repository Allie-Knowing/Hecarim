import styled from "styled-components/native";

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-bottom: 8px;
`;

export const Container = styled.View`
  padding: 10px 20px;
  padding-bottom: 0px;
  height: 83%;
`;

export const Scroll = styled.ScrollView``;

export const ScrollInner = styled.TouchableWithoutFeedback``;

export const Input = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.description1};
`;

export const InputContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.grayscale.scale90};
  padding-top: 5px;
  padding-right: 20px;
  padding-left: 20px;
  height: 15%;
`;

export const InputInner = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 1000px;
  margin-right: 10px;
`;

export const Submit = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.primary.default};
`;
