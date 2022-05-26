import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileImage = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
  margin-left: 20px;
`;

export const ProfileContent = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const Nickname = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.body1};
`;

export const DescriptionButton = styled.TouchableOpacity``;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale50};
  font: ${({ theme }) => theme.fonts.description1};
  margin-top: 4px;
`;

export const Message = styled.Text`
  width: 100%;
  margin-top: 100px;
  text-align: center;
`;

export const Email = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale50};
  margin-left: 5px;
`;

export const NameContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FollowButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 100px;
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const FollowButtonLabel = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const UnFollowButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 100px;
  color: ${({ theme }) => theme.colors.primary.default};
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  border: 1px solid ${({ theme }) => theme.colors.primary.default};
`;

export const UnFollowButtonLabel = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.primary.default};
`;
