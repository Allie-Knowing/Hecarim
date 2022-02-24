import Comment from "components/Comment";
import { forwardRef, useContext, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as S from "./styles";
import DefaultBackDropComponent from "../DefaultBackdropComponent";
import useFocus from "hooks/useFocus";
import StyledBackgroundComponent from "../StyledBackgroundComponent";

const { height } = Dimensions.get("screen");
export interface CommentBottomSheetRefProps {
  open: () => void;
}

const TestImage = require("../../../assets/feed_test.jpg");

const CommentBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputProps, isFocus] = useFocus();

  return (
    <BottomSheet
      ref={ref}
      snapPoints={["70%"]}
      enablePanDownToClose
      enableOverDrag
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
        <S.List
          data={[1, 2, 3, 4, 5, 6, 7]}
          keyExtractor={(i) => `comment_${i}`}
          renderItem={() => <Comment />}
          showsVerticalScrollIndicator={false}
        />
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

export default CommentBottomSheet;
