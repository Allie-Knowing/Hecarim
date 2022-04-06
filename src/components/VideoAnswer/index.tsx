import VideoAnswerContent from "../VideoAnswerContent";
import * as S from "./styles";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { FC, useEffect, useState } from "react";

const { height, width } = Dimensions.get("screen");

interface PropsType {
  onEndReached: () => void;
  isCurrentPage: boolean;
}

const VideoAnswer: FC<PropsType> = () => {
  const [page, setPage] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  useEffect(() => {
    // console.log(page);
  }, [page]);

  return (
    <S.Container
      style={{ height, width }}
      decelerationRate="fast"
      snapToAlignment="start"
      pagingEnabled
      disableIntervalMomentum
      bounces={false}
      bouncesZoom={false}
      contentContainerStyle={{ flexGrow: 1 }}
      snapToInterval={height}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      keyExtractor={(_, index) => index.toString()}
      data={[1, 2, 3, 4]}
      renderItem={() => <VideoAnswerContent />}
    />
  );
};

export default VideoAnswer;
