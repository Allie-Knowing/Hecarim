import Comment from "components/Comment";
import {
  forwardRef,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  FC,
  Fragment,
  Suspense,
  useRef,
} from "react";
import { ListRenderItem, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import * as S from "./styles";
import useFocus from "hooks/useFocus";
import StyledBackgroundComponent from "../StyledBackgroundComponent";
import { useTextAnswer } from "../../../utils/hooks/textAnswer";
import { getTextAnswerList } from "../../../modules/dto/response/textAnswerResponse";
import { useTextAnswerList } from "queries/TextAnswer";
import axios from "axios";

export interface CommentBottomSheetRefProps {
  open: () => void;
}

const TestImage = require("../../../assets/feed_test.jpg");

const CommentBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputProps, isFocus] = useFocus();

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
      <S.InputContainer>
        <S.InputProfile source={TestImage} />
        <S.Input
          placeholder="KJG04로 답변 추가"
          placeholderTextColor={themeContext.colors.grayscale.scale30}
          {...inputProps}
        />
        <TouchableOpacity>
          <S.Submit>추가</S.Submit>
        </TouchableOpacity>
      </S.InputContainer>
      <S.InputMargin style={{ height: isFocus ? 0 : bottomPad }} />
    </BottomSheet>
  );
});

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
