import styled from "styled-components/native";

export const Container = styled.View`
  padding: 10px 20px;
  width: 100%;
  flex-direction: row;
`;

export const ProfileImage = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 1000px;
  margin-right: 16px;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Name = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-right: 8px;
`;

export const Date = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
`;

export const Content = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-top: 8px;
`;
