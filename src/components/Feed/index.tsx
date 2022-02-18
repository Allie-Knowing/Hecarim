import FeedContent from "../FeedContent";
import * as S from "./styles";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { FC, useEffect, useState } from "react";

const { height } = Dimensions.get("screen");

const Feed: FC = () => {
  const [page, setPage] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <S.Container
      style={{ height }}
      decelerationRate="fast"
      snapToAlignment="start"
      pagingEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      snapToInterval={height}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      keyExtractor={(_, index) => index.toString()}
      data={[1, 2, 3, 4]}
      renderItem={() => <FeedContent />}
    />
  );
};

export default Feed;
