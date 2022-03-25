import styled from "styled-components/native";

export const Control = styled.View`
  position: absolute;
  flex-direction: row;
  bottom: 100px;
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

export const RecordVideoContainer = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
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

export const BackImage = styled.Image`
  width: 10;
  height: 18;
`;

export const PreviewHeaderContainer = styled.View`
  position: absolute;
  top: 60px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

export const BackImageContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

export const QuestionVideoText = styled.Text`
  color: #fff;
  font-size: 16;
  flex: 1;
  text-align: center;
`;

export const PreviewNextContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;
