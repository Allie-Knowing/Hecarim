import FeedContent from "../FeedContent";
import * as S from "./styles";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { FC, useState } from "react";
import { Question } from "api/Question";

const { height, width } = Dimensions.get("screen");

interface PropsType {
  dataList: Question[];
  index: number;
  onEndReached: () => void;
}

const FeedVideos: FC<PropsType> = ({ dataList }) => {
  const [, setPage] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  return (
    <S.Container
      style={{ width, height }}
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
      data={dataList}
      renderItem={() => <FeedContent />}
    />
  );
};

export default FeedVideos;
