/* eslint-disable indent */
import Comment from "components/Comment";
import {
  forwardRef,
  useContext,
  useState,
  useCallback,
  useMemo,
  FC,
  Fragment,
  RefObject,
} from "react";
import {
  ListRenderItem,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import * as S from "./styles";
import useFocus from "hooks/useFocus";
import StyledBackgroundComponent from "../StyledBackgroundComponent";
import { useTextAnswerList, useTextAnswerMutation } from "queries/TextAnswer";
import axios from "axios";
import useIsLogin from "hooks/useIsLogin";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQueryClient } from "react-query";
import queryKeys from "constant/queryKeys";
import useAlert from "hooks/useAlert";
import { TextAnswer } from "api/TextAnswer";

export interface CommentBottomSheetRefProps {
  open: () => void;
}

interface PropsType {
  navigation: StackNavigationProp<any>;
  questionId: number;
  isQuestionAdoption: boolean;
}

const CommentBottomSheet = forwardRef<BottomSheet, PropsType>(
  ({ navigation, questionId, isQuestionAdoption }, ref) => {
    const themeContext = useContext(ThemeContext);
    const { bottom: bottomPad } = useSafeAreaInsets();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputProps, isFocus] = useFocus();
    const [text, setText] = useState<string>("");
    const { post } = useTextAnswerMutation();
    const queryClient = useQueryClient();
    const { showAlert, closeAlert } = useAlert();

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          enableTouchThrough={false}
          pressBehavior={"close"}
        />
      ),
      []
    );

    const onLoginPress = useCallback(() => {
      (ref as RefObject<BottomSheet>).current.close();
      navigation.push("Login");
    }, [navigation, ref]);

    const onAddPress = useCallback(async () => {
      const t = text.trim();
      if (t === "") {
        return;
      }
      setText("");
      try {
        await post.mutateAsync({ questionId: questionId, content: t });

        queryClient.invalidateQueries([
          queryKeys.question,
          queryKeys.questionId(questionId),
          queryKeys.textAnswerList,
        ]);
      } catch (error) {
        showAlert({
          title: "글 답변 작성 실패",
          content: "다시 시도해주세요.",
          buttons: [
            { text: "확인", color: "black", onPress: (id) => closeAlert(id) },
          ],
        });
      }
    }, [post, text, queryClient]);

    return (
      <BottomSheet
        ref={ref}
        snapPoints={["70%"]}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        backgroundComponent={StyledBackgroundComponent}
        handleIndicatorStyle={{
          backgroundColor: themeContext.colors.grayscale.scale50,
        }}
        backgroundStyle={{
          backgroundColor: themeContext.colors.grayscale.scale100,
        }}
        onChange={(index) => setIsOpen(index !== -1)}
        keyboardBehavior="extend"
      >
        <S.Container>
          <S.Title>글 답변</S.Title>
          <TextAnswerList
            isQuestionAdoption={isQuestionAdoption}
            questionId={questionId}
            isOpen={isOpen}
          />
        </S.Container>
        <S.InputContainer>
          <S.Input
            placeholder="글 답변 작성하기..."
            placeholderTextColor={themeContext.colors.grayscale.scale30}
            {...inputProps}
            value={text}
            onChangeText={(e) => setText(e)}
          />
          <TouchableOpacity onPress={onAddPress}>
            <S.Submit>추가</S.Submit>
          </TouchableOpacity>
        </S.InputContainer>
        <S.InputMargin style={{ height: isFocus ? 0 : bottomPad }} />
      </BottomSheet>
    );
  }
);

interface ListProps {
  isOpen: boolean;
  questionId: number;
  isQuestionAdoption: boolean;
}

const size = 20;

const TextAnswerList: FC<ListProps> = ({
  isOpen,
  questionId,
  isQuestionAdoption,
}) => {
  const { data, isLoading, isError, error, fetchNextPage } = useTextAnswerList(
    questionId,
    size,
    isOpen
  );

  const renderItem: ListRenderItem<TextAnswer> = useCallback(({ item }) => {
    return (
      <Comment
        questionId={questionId}
        {...item}
        isQuestionAdoption={isQuestionAdoption}
      />
    );
  }, []);

  const onEndReached = useCallback(() => {
    if (!isError) {
      fetchNextPage();
    }
  }, [isError]);

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
    return <S.Message>글 답변 목록 로딩중...</S.Message>;
  }

  if (isError && axios.isAxiosError(error) && error.response.status !== 404) {
    return <S.Message>글 답변 목록 오류</S.Message>;
  }

  return (
    <Fragment>
      {data && list.length > 0 ? (
        <S.List
          data={list}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />
      ) : (
        <S.Message>글 답변이 없습니다</S.Message>
      )}
    </Fragment>
  );
};

export default CommentBottomSheet;
