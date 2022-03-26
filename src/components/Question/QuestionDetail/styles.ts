import styled from "styled-components/native";

export const QuestionDetailWrapper = styled.View<{
  topPad: number;
  height: number;
}>`
  height: ${(props) => props.height};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${(props) => props.topPad};
`;

export const QuestionDetailHeader = styled.View<{ topPad: number }>`
  width: 100%;
  height: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 20;
  padding-right: 20;
  position: absolute;
  top: ${(props) => props.topPad};
`;

export const GoBackContainer = styled.TouchableOpacity`
  flex: 1;
  text-align: center;
  font: ${({ theme }) => theme.fonts.body2};
`;

export const GoBackImage = styled.Image`
  width: 10;
  height: 18;
`;

export const InputQuestionInfoText = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 16;
`;

export const UploadContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const UploadText = styled.Text`
  font-size: 16;
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const QuestionDetailBody = styled.View<{ height: number }>`
  height: ${(props) => props.height};
`;

export const VideoContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 10;
  flex: 1;
`;

export const InputContainer = styled.View`
  display: flex;
  width: 100%;
  padding-left: 20;
  padding-right: 20;
  margin-top: 12;
  margin-bottom: 28;
  flex: 1;
`;

export const InputBox = styled.View`
  margin-top: 16;
`;

export const TitleText = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  margin-bottom: 10;
`;

export const TitleInput = styled.TextInput`
  font-size: 16;
  width: 100%;
  height: 25;
`;

export const TitleInputContainer = styled.View<{
  borderColor: string;
}>`
  border-bottom-width: 1;
  border-bottom-color: ${(props) => props.borderColor};
  position: relative;
`;

export const TextArea = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
  font: ${({ theme }) => theme.fonts.body3};
  padding-top: 8;
  padding-bottom: 8;
  padding-left: 16;
  padding-right: 16;
  border-radius: 10;
  font-size: 16;
`;
