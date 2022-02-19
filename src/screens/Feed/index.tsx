import {
  Dimensions,
  ListViewComponent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import * as S from "./styles";
import FeedVideos from "../../components/FeedVideos";
import VideoAnswer from "components/VideoAnswer";
import React, { FC, useEffect, useRef } from "react";
import { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LayoutChangeEvent } from "react-native";

const { height, width } = Dimensions.get("screen");
const navGap = 16;

interface WidthsType {
  question: number;
  answer: number;
}

const Feed = () => {
  const [page, setPage] = useState<number>(0);
  const [widths, setWidths] = useState<WidthsType>({ question: 0, answer: 0 });
  const pageOffset = useSharedValue<number>(0);

  const questionOpacity = interpolate(pageOffset.value, [0, 1], [1, 0.5]);
  const answerOpacity = interpolate(pageOffset.value, [0, 1], [0.5, 1]);

  const questionNavStyle = useAnimatedStyle(() => ({
    opacity: questionOpacity,
    left: width / 2 - widths.question / 2,
  }));

  const answerNavStyle = useAnimatedStyle(() => ({
    opacity: answerOpacity,
    left: width / 2 - widths.answer / 2,
  }));

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / width);
    pageOffset.value = e.nativeEvent.contentOffset.x / width;

    setPage(newPage);
  };

  const onLayout = (name: keyof WidthsType) => (e: LayoutChangeEvent) =>
    setWidths({ ...widths, [name]: e.nativeEvent.layout.width });

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <S.Wrapper style={{ height }}>
      <S.Outer
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled
        snapToInterval={width}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(_, index) => index.toString()}
        onScroll={onScroll}
        data={[FeedVideos, VideoAnswer]}
        renderItem={(value) => React.createElement(value.item as FC)}
      />
      <S.NavContaier style={questionNavStyle} onLayout={onLayout("question")}>
        <S.NavText>질문</S.NavText>
      </S.NavContaier>
      <S.NavContaier style={answerNavStyle} onLayout={onLayout("answer")}>
        <S.NavText>영상 답변</S.NavText>
      </S.NavContaier>
    </S.Wrapper>
  );
};

export default Feed;
