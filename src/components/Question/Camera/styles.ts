import styled from "styled-components/native";

export const QuestionWrapper = styled.View`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const GoBackContainer = styled.TouchableOpacity`
  text-align: center;
  font: ${({ theme }) => theme.fonts.body2};
  z-index: 10;
  left: 10;
  width: 40;
  height: 40;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GoBackImage = styled.Image`
  width: 10;
  height: 18;
`;

export const Control = styled.View<{ bottom: number }>`
  position: absolute;
  flex-direction: row;
  bottom: ${(props) => props.bottom};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 20;
  padding-right: 20;
`;

export const GetVideoContainer = styled.TouchableOpacity`
  width: 55;
  height: 55;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
`;

export const VideoImage = styled.Image`
  width: 40;
  height: 40;
`;

export const FlipCameraImage = styled.Image`
  width: 48;
  height: 48;
`;

export const RecordVideoContainer = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RecordingVideoImage = styled.Image`
  width: 60;
  height: 60;
`;

export const FlipCameraContainer = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const RecordIndicatorContainer = styled.View`
  flex-direction: row;
  position: absolute;
  top: 25;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  opacity: 0.7;
`;

export const RecordDot = styled.View`
  border-radius: 3;
  height: 6;
  width: 6;
  background-color: #ff0000;
  top: 30;
`;

export const RecordTitle = styled.Text`
  font-size: 14;
  color: #ffffff;
  text-align: center;
  top: 30;
  margin-left: 10;
`;

export const RecordImageStyle = styled.Image`
  width: 60;
  height: 60;
`;

export const Container = styled.SafeAreaView`
  position: relative;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grayscale.scale100};
  display: flex;
  justify-content: center;
`;

export const Message = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const Text = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale50};
`;
