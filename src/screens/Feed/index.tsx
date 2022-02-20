import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from "react-native";
import * as S from "./styles";
import FeedVideos from "../../components/FeedVideos";
import VideoAnswer from "components/VideoAnswer";
import React, { FC } from "react";
import { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
  AnimateStyle,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback } from "react";

const { height, width } = Dimensions.get("screen");
const navGap = 24;

interface WidthsType {
  question: number;
  answer: number;
}

const Feed = () => {
  const [widths, setWidths] = useState<WidthsType>({ question: 0, answer: 0 });
  const pageOffset = useSharedValue<number>(0);
  const { top: topPad } = useSafeAreaInsets();

  const questionNavStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pageOffset.value, [0, 1], [1, 0.4]),
    transform: [
      {
        translateX: interpolate(
          pageOffset.value,
          [0, 1],
          [0, -(widths.answer / 2) - navGap - widths.question / 2]
        ),
      },
    ],
  }));

  const answerNavStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pageOffset.value, [0, 1], [0.4, 1]),
    transform: [
      {
        translateX: interpolate(
          pageOffset.value,
          [0, 1],
          [widths.question / 2 + widths.question + navGap, 0]
        ),
      },
    ],
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (evnet) => {
      pageOffset.value = evnet.contentOffset.x / width;
    },
  });

  const onLayout = (name: keyof WidthsType) => (e: LayoutChangeEvent) =>
    setWidths({ ...widths, [name]: e.nativeEvent.layout.width });

  const NavStyle = useCallback(
    (name: keyof WidthsType): AnimateStyle<ViewStyle> => ({
      left: width / 2 - widths[name] / 2,
      top: topPad + 20,
      position: "absolute",
    }),
    [widths, topPad]
  );

  return (
    <S.Wrapper style={{ height }}>
      <S.Outer
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled
        snapToInterval={width}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(_, index) => index.toString()}
        onScroll={scrollHandler}
        data={[FeedVideos, VideoAnswer]}
        renderItem={(value) => React.createElement(value.item as FC)}
      />
      <Animated.View
        style={[NavStyle("question"), questionNavStyle]}
        onLayout={onLayout("question")}
      >
        <S.NavText>질문</S.NavText>
      </Animated.View>
      <Animated.View
        style={[NavStyle("answer"), answerNavStyle]}
        onLayout={onLayout("answer")}
      >
        <S.NavText>영상 답변</S.NavText>
      </Animated.View>
    </S.Wrapper>
  );
};

export default Feed;
