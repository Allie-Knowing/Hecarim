import Comment from "components/Comment";
import { forwardRef, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

const { height } = Dimensions.get("screen");
export interface CommentBottomSheetRefProps {
  open: () => void;
}

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
        <S.Input
          placeholder="Write a comment..."
          style={{ paddingBottom: bottomPad }}
        />
      </View>
    </RBSheet>
  );
});

export default CommentBottomSheet;
