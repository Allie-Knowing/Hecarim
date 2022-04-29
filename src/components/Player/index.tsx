import { forwardRef } from "react";
import * as S from "./styles";
import { useTheme } from "styled-components/native";
import { Video } from "expo-av";
import { GestureResponderEvent } from "react-native";

const Play = require("../../assets/play.png");

interface PropsType {
  isStop: boolean;
}

export const Player = forwardRef<Video, PropsType>(({ isStop }, ref) => {
  const theme = useTheme();

  return (
    <>
      {isStop && <S.VideoStateIcon source={Play} />}
      <S.Video
        isLooping
        resizeMode="cover"
        ref={ref}
        rate={1.0}
        volume={1.0}
        style={{ backgroundColor: theme.colors.grayscale.scale100 }}
      />
    </>
  );
});
