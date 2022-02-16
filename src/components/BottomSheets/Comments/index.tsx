import Comment from "components/Comment";
import { forwardRef, useContext } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

const { height } = Dimensions.get("screen");
export interface CommentBottomSheetRefProps {
  open: () => void;
}

const CommentBottomSheet = forwardRef<RBSheet>((_, ref) => {
  const themeContext = useContext(ThemeContext);

  return (
    <RBSheet
      ref={ref}
      height={height * 0.6}
      openDuration={400}
      closeOnDragDown
      closeOnPressMask
      customStyles={{
        container: {
          backgroundColor: themeContext.colors.grayscale.scale100,
        },
        draggableIcon: {
          backgroundColor: themeContext.colors.grayscale.scale70,
        },
      }}
    >
      <S.Container>
        <ScrollView>
          <View>
            <S.Title>댓글</S.Title>
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
        </ScrollView>
      </S.Container>
    </RBSheet>
  );
});

export default CommentBottomSheet;
