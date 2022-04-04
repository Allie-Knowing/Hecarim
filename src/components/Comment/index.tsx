import { getTextAnswerList } from "modules/dto/response/textAnswerResponse";
import { FC, useMemo } from "react";
import { useTheme } from "styled-components/native";
import * as S from "./styles";

function timeForToday(value: string) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

const Comment: FC<getTextAnswerList> = ({
  user,
  content,
  id,
  is_adoption,
  created_at,
}) => {
  const profile = useMemo(() => user?.profile || "", [user?.profile]);
  const theme = useTheme();

  return (
    <S.Container
      style={{
        backgroundColor: !is_adoption
          ? theme.colors.primary.default
          : undefined,
      }}
    >
      <S.ProfileImage source={{ uri: profile }} />
      <S.ContentContainer>
        <S.HeaderContainer>
          <S.Name>{`${user.name || ""}`}</S.Name>
          <S.Date>{timeForToday(created_at)}</S.Date>
        </S.HeaderContainer>
        <S.Content>{`${content || ""}`}</S.Content>
      </S.ContentContainer>
    </S.Container>
  );
};

export default Comment;
