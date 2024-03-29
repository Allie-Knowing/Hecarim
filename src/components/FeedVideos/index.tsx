import FeedContent from "../FeedContent";
import * as S from "./styles";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
} from "react-native";
import { FC, memo, useEffect, useRef, useState } from "react";
import { Question } from "api/Question";

const { height, width } = Dimensions.get("screen");

interface PropsType {
  dataList: Question[];
  index: number;
  onEndReached: () => void;
  isCurrentPage: boolean;
  setCurrentQuestionId: (id: number) => void;
}

const FeedVideos: FC<PropsType> = ({
  dataList,
  onEndReached,
  isCurrentPage,
  setCurrentQuestionId,
  index,
}) => {
  const [page, setPage] = useState(0);
  const flatListRef = useRef<any>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  const renderItem: ListRenderItem<Question> = ({ item, index }) => (
    <FeedContent
      isNextPage={page + 1 === index && isCurrentPage}
      isCurrentPage={index === page && isCurrentPage}
      isFar={isCurrentPage && index <= page - 3}
      {...item}
    />
  );

  useEffect(() => {
    if (dataList.length > 0) {
      setCurrentQuestionId(dataList[page].id);
    }
  }, [page, dataList, setCurrentQuestionId]);

  return (
    <S.Container
      ref={flatListRef}
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
      keyExtractor={(item: Question) => `question_${item.id}`}
      data={dataList}
      renderItem={renderItem}
      onEndReached={onEndReached}
      initialScrollIndex={index}
      initialNumToRender={2}
      onScrollToIndexFailed={({ index, averageItemLength }) => {
        flatListRef.current?.scrollToOffset({
          offset: index * averageItemLength,
          animated: true,
        });
      }}
    />
  );
};

export default memo(FeedVideos);
