import { forwardRef } from "react";
import { Dimensions, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const { height } = Dimensions.get("screen");
export interface CommentBottomSheetRefProps {
  open: () => void;
}

const CommentBottomSheet = forwardRef<RBSheet>((_, ref) => {
  return (
    <RBSheet
      ref={ref}
      height={height * 0.6}
      openDuration={250}
      closeOnDragDown
      closeOnPressMask
    >
      <View>
        <Text>hello world!</Text>
      </View>
    </RBSheet>
  );
});

export default CommentBottomSheet;
