import styled from "styled-components/native";

export const ProfileEditContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
`;

export const PictureContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Picture = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-top: 20px;
`;

export const PictureEditBtn = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.description1};
  margin: 16px 0px;
`;

export const NicknameEdit = styled.View`
  width: 296px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
  border-radius: 10px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const NicknameInput = styled.TextInput`
  margin-left: 16px;
  padding-bottom: 2px;
  width: 200px;
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const EditImage = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 16px;
`;
