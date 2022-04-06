import VideoAnswerContent from "../VideoAnswerContent";
import * as S from "./styles";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
  Text,
} from "react-native";
import { FC, useEffect, useMemo, useState } from "react";
import { VideoAnswer as VideoAnswerType } from "api/Answer";
import { useVideoAnswerList } from "queries/Answer";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

interface PropsType {
  onEndReached: () => void;
  isCurrentPage: boolean;
  questionId: number;
}

const size = 20;

const VideoAnswer: FC<PropsType> = ({
  isCurrentPage,
  onEndReached,
  questionId,
}) => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error } = useVideoAnswerList(
    questionId,
    size
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  const renderItem: ListRenderItem<VideoAnswerType> = ({ item }) => (
    <VideoAnswerContent {...item} />
  );

  const list = useMemo(
    () =>
      data
        ? (data.pages || [])
            .map((value) => value.data)
            .reduce(function (acc, cur) {
              return acc.concat(cur);
            })
        : [],
    [data]
  );

  if (isLoading) {
    return (
      <S.Message style={{ height, width }}>
        <S.Text>로딩중...</S.Text>
      </S.Message>
    );
  }

  if (isError && axios.isAxiosError(error) && error.response.status !== 404) {
    return (
      <S.Message style={{ height, width }}>
        <S.Text>영상 답변을 가져오는 중 오류가 발생하였습니다.</S.Text>
      </S.Message>
    );
  }

  if (list.length <= 0) {
    return (
      <S.Message style={{ height, width }}>
        <S.Text>영상 답변이 없습니다.</S.Text>
      </S.Message>
    );
  }

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
      keyExtractor={(item: VideoAnswerType) =>
        `video_answer_${item.id}_${item.like_cnt}_${item.video_url}`
      }
      data={list}
      renderItem={renderItem}
    />
  );
};

export default VideoAnswer;
