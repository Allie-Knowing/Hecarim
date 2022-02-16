import Comment from "components/Comment";
import { forwardRef, useContext } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

const { height } = Dimensions.get("screen");
export interface CommentBottomSheetRefProps {
  open: () => void;
}

const TestImage = require("../../../assets/feed_test.jpg");

const CommentBottomSheet = forwardRef<RBSheet>((_, ref) => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();

  return (
    <RBSheet
      ref={ref}
      height={height * 0.6}
      openDuration={400}
      closeOnDragDown
      customStyles={{
        container: {
          backgroundColor: themeContext.colors.grayscale.scale100,
        },
        draggableIcon: {
          backgroundColor: themeContext.colors.grayscale.scale70,
        },
      }}
    >
      <View>
        <S.Container>
          <S.Title>댓글</S.Title>
          <S.Scroll>
            <S.ScrollInner>
              <View>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
              </View>
            </S.ScrollInner>
          </S.Scroll>
        </S.Container>
        <S.InputContainer style={{ paddingBottom: bottomPad }}>
          <S.InputWrapper>
            <S.InputInner>
              <S.ProfileImage source={TestImage} />
              <S.Input
                placeholder="KJG04로 답변 추가"
                placeholderTextColor={themeContext.colors.grayscale.scale30}
              />
            </S.InputInner>
            <TouchableOpacity onPress={() => {}}>
              <S.Submit>추가</S.Submit>
            </TouchableOpacity>
          </S.InputWrapper>
        </S.InputContainer>
      </View>
    </RBSheet>
  );
});

export default CommentBottomSheet;
