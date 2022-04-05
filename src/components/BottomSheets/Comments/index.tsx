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
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import BottomSheet from "@gorhom/bottom-sheet";
import * as S from "./styles";
import DefaultBackDropComponent from "../DefaultBackdropComponent";
import useFocus from "hooks/useFocus";
import StyledBackgroundComponent from "../StyledBackgroundComponent";
import { useTextAnswer } from "../../../utils/hooks/textAnswer";
import { getTextAnswerList } from "../../../modules/dto/response/textAnswerResponse";

export interface CommentBottomSheetRefProps {
  open: () => void;
}

const TestImage = require("../../../assets/feed_test.jpg");

const CommentBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputProps, isFocus] = useFocus();
  const { state, setState } = useTextAnswer();
  const [page, setPage] = useState<number>(1);
  const requestedPage = useRef<number>(-1);

  useEffect(() => {
    if (isOpen) {
      setState.resetTextAnswerList();
      setPage(1);
    }
  }, [isOpen]);

  const onEndReached = useCallback(() => {
    if (state.error.statuscode !== 404 && isOpen) {
      setPage((prev) => prev + 1);
    }
  }, [isOpen, state.error.statuscode]);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={["70%"]}
      enablePanDownToClose
      index={-1}
      backdropComponent={DefaultBackDropComponent(isOpen)}
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
        <Suspense fallback={<S.Message>글 답변 로딩 중</S.Message>}>
          <TextAnswerList {...{ isOpen, onEndReached, page, requestedPage }} />
        </Suspense>
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
  page: number;
  isOpen: boolean;
  onEndReached: () => void;
  requestedPage: React.MutableRefObject<number>;
}

const TextAnswerList: FC<ListProps> = ({
  isOpen,
  onEndReached,
  page,
  requestedPage,
}) => {
  const { state, setState } = useTextAnswer();

  const data = useMemo(
    () => state.getTextAnswerListResponse.data,
    [state.getTextAnswerListResponse.data]
  );

  useEffect(() => {
    if (isOpen && page !== requestedPage.current) {
      setState.getTextAnswerList({ page, size: 20, questionId: 1 });
      requestedPage.current = page;
    }
  }, [isOpen, page, requestedPage]);

  return (
    <Fragment>
      {data && data.length > 0 ? (
        <S.List
          data={data}
          keyExtractor={(value: getTextAnswerList) =>
            `comment_${value.id}_${value.user.id}`
          }
          renderItem={({ item }: { item: getTextAnswerList }) => (
            <Comment {...item} />
          )}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <S.Message>글 답변이 없습니다</S.Message>
      )}
    </Fragment>
  );
};

export default CommentBottomSheet;
