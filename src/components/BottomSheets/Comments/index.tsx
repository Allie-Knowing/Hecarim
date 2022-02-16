import { forwardRef, useContext } from "react";
import { Dimensions, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { ThemeContext } from "styled-components/native";

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
      <View>
        <Text>hello world!</Text>
      </View>
    </RBSheet>
  );
});

export default CommentBottomSheet;
