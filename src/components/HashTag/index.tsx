import axios from "axios";
import { useQuestionHashtag } from "queries/Question";
import { FC, memo, useMemo } from "react";
import * as S from "./styles";

interface HashtagProps {
  id: number;
}

const HashTag: FC<HashtagProps> = ({ id }) => {
  const { data, isLoading, isError, error } = useQuestionHashtag(id);

  const hashtags = useMemo(() => data?.data.data || [], [data]);

  if (isLoading) {
    return <S.Description>해쉬태그 로딩 중...</S.Description>;
  }

  if (isError && axios.isAxiosError(error) && error.response.status === 404) {
    return <S.Description>해쉬태그가 없습니다.</S.Description>;
  }

  if (isError) {
    return <S.Description>해쉬태그를 가져오는 중 오류 발생</S.Description>;
  }

  return <S.HashTag>{hashtags.map((value) => `#${value.title}`).join(" ")}</S.HashTag>;
};

export default memo(HashTag);
