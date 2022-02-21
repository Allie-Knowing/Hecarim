import Comment from "components/Comment";
import { forwardRef, useContext } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Portal } from "react-native-portalize";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import BottomSheet from "@gorhom/bottom-sheet";
import * as S from "./styles";

const { height } = Dimensions.get("screen");
export interface CommentBottomSheetRefProps {
  open: () => void;
}

const TestImage = require("../../../assets/feed_test.jpg");

const CommentBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();

  return (
    <Portal>
      <BottomSheet
        ref={ref}
        snapPoints={["60%"]}
        enablePanDownToClose
        index={-1}
      >
        <Text>hello world!</Text>
      </BottomSheet>
    </Portal>
  );
});

export default CommentBottomSheet;
