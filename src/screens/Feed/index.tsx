import { Dimensions } from "react-native";
import * as S from "./styles";
import FeedVideos from "../../components/FeedVideos";
import VideoAnswer from "components/VideoAnswer";
import React, { FC } from "react";

const { height, width } = Dimensions.get("screen");

const Feed = () => {
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
        data={[FeedVideos, VideoAnswer]}
        renderItem={(value) => React.createElement(value.item as FC)}
      />
    </S.Wrapper>
  );
};

export default Feed;
