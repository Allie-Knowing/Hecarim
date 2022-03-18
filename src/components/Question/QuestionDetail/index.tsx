import React, { FC, useEffect } from "react";
import { Animated, Text } from "react-native";
import * as S from "./styles";

interface Props {
  isRecording: boolean;
  videoSrc: string | null;
}

const QuestionDetail: FC<Props> = ({ isRecording, videoSrc }): JSX.Element => {
  //   useEffect(() => {
  //     Animated.timing(new Animated.Value(1), {
  //       toValue: 250,
  //       duration: 2000,
  //       useNativeDriver: false,
  //     }).start();
  //   }, []);

  //   const animationStyles = {
  //     transform: [{ translateY: new Animated.Value(1) }],
  //   };

  //   const objectStyles = {
  //     object: {
  //       backgroundColor: "orange",
  //       width: 100,
  //       height: 100,
  //     },
  //   };

  return (
    <S.QuestionDetailWrapper left={isRecording ? "0%" : "100%"}>
      <Text>yeah</Text>
    </S.QuestionDetailWrapper>
  );
};

export default QuestionDetail;
