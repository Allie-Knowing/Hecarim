import styled from "styled-components/native";
import { Video as VideoAv } from "expo-av";

export const Video = styled(VideoAv)`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export const VideoStateIcon = styled.Image`
  position: absolute;
  z-index: 99;
  width: 50px;
  height: 60px;
  opacity: 0.7;
`;

export const Container = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  justify-content: center;
  align-items: center;
`;
