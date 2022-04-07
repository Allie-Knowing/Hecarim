import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TextAnswer } from "api/TextAnswer";
import Tool, { ToolItem } from "components/BottomSheets/Tool";
import queryKeys from "constant/queryKeys";
import useAlert from "hooks/useAlert";
import { useTextAnswerMutation } from "queries/TextAnswer";
import { FC, Fragment, useCallback, useMemo, useRef } from "react";
import { TouchableHighlight } from "react-native";
import { Portal } from "react-native-portalize";
import { useQueryClient } from "react-query";
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

interface PropsType {
  isQuestionAdoption: boolean;
  questionId: number;
}

const Comment: FC<TextAnswer & PropsType> = ({
  user,
  content,
  id,
  is_mine,
  is_adoption,
  isQuestionAdoption,
  created_at,
  questionId,
}) => {
  const profile = useMemo(() => user?.profile || "", [user?.profile]);
  const theme = useTheme();
  const ref = useRef<BottomSheetModal>(null);
  const { remove, adoption } = useTextAnswerMutation();
  const queryClient = useQueryClient();
  const { closeAlert: closeAlret, showAlert: showAlret } = useAlert();

  const onDeletePress = useCallback(async () => {
    ref.current.close();
    showAlret({
      title: "삭제하시겠습니까?",
      content: "삭제된 답변은 복구가\n불가능 합니다.",
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
              queryKeys.questionId(questionId),
              queryKeys.textAnswerList,
            ]);
          },
        },
      ],
    });
  }, [id, remove, questionId, id, closeAlret, showAlret]);

  const onAdoptionPress = useCallback(() => {
    showAlret({
      title: "채택하시겠습니까?",
      content: "태책된 답변은 취소가\n불가능 합니다.",
      buttons: [
        { text: "취소", color: "black", onPress: (id) => closeAlret(id) },
        {
          text: "채택",
          color: "primary",
          onPress: async (alret) => {
            closeAlret(alret);
            await adoption.mutateAsync(id);
            queryClient.invalidateQueries([
              queryKeys.question,
              queryKeys.questionId(questionId),
            ]);
          },
        },
      ],
    });
  }, [showAlret, closeAlret, adoption, queryClient, questionId, id]);

  const toolItem = useMemo<ToolItem[]>(() => {
    const item: ToolItem[] = [];
    if (is_mine) {
      item.push({
        color: theme.colors.red.default,
        text: "삭제하기",
        onPress: onDeletePress,
      });
    }

    if (!isQuestionAdoption && is_adoption) {
      item.push({
        color: theme.colors.primary.default,
        text: "채택하기",
        onPress: onAdoptionPress,
      });
    }
    return item;
  }, [onDeletePress, theme, onAdoptionPress]);

  const onCommentPress = useCallback(() => {
    if (toolItem.length > 0) {
      ref.current.present();
    }
  }, [toolItem]);

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
