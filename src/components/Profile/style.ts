import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
  margin-left: 20px;
`;

export const ProfileContent = styled.View`
  margin-left: 16px;
`;

export const Nickname = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.body1};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale50};
  font: ${({ theme }) => theme.fonts.description1};
  margin-top: 4px;
`;
