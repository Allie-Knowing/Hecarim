import VideoAnswerContent from "../VideoAnswerContent";
import * as S from "./styles";
import { Dimensions, NativeSyntheticEvent, NativeScrollEvent, ListRenderItem } from "react-native";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { VideoAnswer as VideoAnswerType } from "api/Answer";
import { useVideoAnswerCount, useVideoAnswerList } from "queries/Answer";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import videoAnswerCountState from "atom/videoAnswerCount";

const { height, width } = Dimensions.get("screen");

interface PropsType {
  isCurrentPage: boolean;
  questionId: number;
  isQuestionMine: boolean;
  isQuestionAdoption: number;
}

const size = 10;

const VideoAnswer: FC<PropsType> = ({
  isCurrentPage,
  questionId,
  isQuestionMine,
  isQuestionAdoption,
}) => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error, fetchNextPage } = useVideoAnswerList(questionId, size);
  const { data: countData } = useVideoAnswerCount(questionId);
  const setVideoAnswerCount = useSetRecoilState(videoAnswerCountState);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  const renderItem: ListRenderItem<VideoAnswerType> = ({ item, index }) => (
    <VideoAnswerContent
      isQuestionMine={isQuestionMine}
      isCurrentPage={page === index && isCurrentPage}
      isNextPage={page + 1 === index && isCurrentPage}
      isFar={isCurrentPage && index <= page - 3}
      isQuestionAdoption={isQuestionAdoption === 1}
      {...item}
    />
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

  useEffect(() => {
    setVideoAnswerCount(countData?.data?.data.video_answer_cnt);
  }, [countData, setVideoAnswerCount]);

  const onEndReached = useCallback(() => {
    if (!isError) {
      fetchNextPage();
    }
  }, [fetchNextPage, isError]);

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
      onEndReached={onEndReached}
      initialNumToRender={2}
    />
  );
};

export default memo(VideoAnswer);
