import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { forwardRef, useContext, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import DefaultBackDropComponent from "../DefaultBackdropComponent";
import * as S from "./styles";

interface PropsType {
  items: ToolItem[];
}

export interface ToolItem {
  onPress: () => void;
  text: string;
  color: string;
}

const Tool = forwardRef<BottomSheet, PropsType>(({ items }, ref) => {
  const { bottom: bottomPad } = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);
  const {
    animatedSnapPoints,
    animatedContentHeight,
    animatedHandleHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      index={-1}
      onChange={(index) => setIsOpen(index !== -1)}
      backdropComponent={DefaultBackDropComponent(isOpen)}
      enablePanDownToClose
      animateOnMount
      handleStyle={{
        backgroundColor: themeContext.colors.grayscale.scale20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      handleIndicatorStyle={{
        backgroundColor: themeContext.colors.grayscale.scale50,
      }}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <S.Container>
          {items.map((value, index) => (
            <S.Button
              style={{ borderTopWidth: index === 0 ? 0 : 1 }}
              onPress={value.onPress}
              underlayColor={themeContext.colors.grayscale.scale30}
              activeOpacity={1}
            >
              <S.Label color={value.color}>{value.text}</S.Label>
            </S.Button>
          ))}
          <S.Pad style={{ height: bottomPad }} />
        </S.Container>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default Tool;
