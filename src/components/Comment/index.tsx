import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Tool, { ToolItem } from "components/BottomSheets/Tool";
import queryKeys from "constant/queryKeys";
import useAlret from "hooks/useAlert";
import { getTextAnswerList } from "modules/dto/response/textAnswerResponse";
import { useTextAnswerMutation } from "queries/TextAnswer";
import { FC, Fragment, useCallback, useMemo, useRef } from "react";
import { TouchableHighlight } from "react-native";
import { Portal } from "react-native-portalize";
import { useQueryClient } from "react-query";
import { useTheme } from "styled-components/native";
import { useTextAnswer } from "utils/hooks/textAnswer";
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
  is_mine,
  is_adoption,
  created_at,
}) => {
  const profile = useMemo(() => user?.profile || "", [user?.profile]);
  const theme = useTheme();
  const ref = useRef<BottomSheetModal>(null);
  const { remove } = useTextAnswerMutation();
  const queryClient = useQueryClient();
  const { closeAlert: closeAlret, showAlert: showAlret } = useAlret();

  const onDeletePress = useCallback(async () => {
    ref.current.close();
    showAlret({
      title: "삭제하시겠습니까?",
      content: "삭제된 댓글은 복구가\n불가능 합니다.",
      buttons: [
        { text: "취소", color: "black", onPress: (id) => closeAlret(id) },
        {
          text: "삭제",
          color: "red",
          onPress: async (alret) => {
            closeAlret(alret);
            await remove.mutateAsync({ commentId: id });
            queryClient.invalidateQueries([
              queryKeys.question,
              queryKeys.questionId(1),
              queryKeys.textAnswerList,
            ]);
          },
        },
      ],
    });
  }, [id, remove]);

  const toolItem = useMemo<ToolItem[]>(
    () => [
      {
        color: theme.colors.red.default,
        text: "삭제하기",
        onPress: onDeletePress,
      },
    ],
    [onDeletePress, theme.colors.red.default]
  );

  const onCommentPress = useCallback(() => {
    ref.current.present();
  }, []);

  return (
    <Fragment>
      <TouchableHighlight onPress={is_mine ? onCommentPress : undefined}>
        <S.Container
          style={{
            backgroundColor: is_adoption
              ? theme.colors.primary.default
              : undefined,
          }}
        >
          <S.ProfileImage source={{ uri: profile }} />
          <S.ContentContainer>
            <S.HeaderContainer>
              <S.Name>{`${user.name || ""}`}</S.Name>
              <S.Date
                style={{
                  color: is_adoption
                    ? theme.colors.grayscale.scale10
                    : theme.colors.grayscale.scale50,
                }}
              >
                {timeForToday(created_at)}
              </S.Date>
            </S.HeaderContainer>
            <S.Content>{`${content || ""}`}</S.Content>
          </S.ContentContainer>
        </S.Container>
      </TouchableHighlight>
      {is_mine && (
        <Portal>
          <Tool ref={ref} items={toolItem} />
        </Portal>
      )}
    </Fragment>
  );
};

export default Comment;
