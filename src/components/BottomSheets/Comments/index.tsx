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
import { getTextAnswerList } from "../../../modules/dto/response/textAnswerResponse";
import { useTextAnswerList, useTextAnswerMutation } from "queries/TextAnswer";
import axios from "axios";
import useIsLogin from "hooks/useIsLogin";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQueryClient } from "react-query";
import queryKeys from "constant/queryKeys";
import useAlret from "hooks/useAlert";

export interface CommentBottomSheetRefProps {
  open: () => void;
}

const TestImage = require("../../../assets/feed_test.jpg");

interface PropsType {
  navigation: StackNavigationProp<any>;
}

const CommentBottomSheet = forwardRef<BottomSheet, PropsType>(
  ({ navigation }, ref) => {
    const themeContext = useContext(ThemeContext);
    const { bottom: bottomPad } = useSafeAreaInsets();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputProps, isFocus] = useFocus();
    const isLogin = useIsLogin();
    const [text, setText] = useState<string>("");
    const { post } = useTextAnswerMutation();
    const queryClient = useQueryClient();
    const { showAlert: showAlret, closeAlert: closeAlret } = useAlret();

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
        await post.mutateAsync({ questionId: 1, content: t });

        queryClient.invalidateQueries([
          queryKeys.question,
          queryKeys.questionId(1),
          queryKeys.textAnswerList,
        ]);
      } catch (error) {
        showAlret({
          title: "글 답변 작성 실패",
          content: "다시 시도해주세요.",
          buttons: [
            { text: "확인", color: "black", onPress: (id) => closeAlret(id) },
          ],
        });
      }
    }, [post, text, queryClient]);

    const input = useMemo(() => {
      if (!isLogin) {
        return (
          <S.InputContainer>
            <S.InputProfile source={TestImage} />
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
        );
      } else {
        return (
          <TouchableWithoutFeedback onPress={onLoginPress}>
            <S.InputContainer>
              <S.InputMessage>로그인 후 답변 달기</S.InputMessage>
            </S.InputContainer>
          </TouchableWithoutFeedback>
        );
      }
    }, [isLogin, onLoginPress, text, inputProps, themeContext, onAddPress]);

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
          <S.Title>댓글</S.Title>
          <TextAnswerList isOpen={isOpen} />
        </S.Container>
        {input}
        <S.InputMargin style={{ height: isFocus ? 0 : bottomPad }} />
      </BottomSheet>
    );
  }
);

interface ListProps {
  isOpen: boolean;
}

const TextAnswerList: FC<ListProps> = ({ isOpen }) => {
  const { data, isLoading, isError, error, fetchNextPage } = useTextAnswerList(
    1,
    20,
    isOpen
  );

  const renderItem: ListRenderItem<getTextAnswerList> = useCallback(
    ({ item }) => {
      return <Comment {...item} />;
    },
    []
  );

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
