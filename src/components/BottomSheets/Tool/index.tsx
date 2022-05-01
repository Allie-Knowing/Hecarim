import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import useThemeContext from "hooks/useThemeContext";
import { forwardRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StyledBackgroundComponent from "../StyledBackgroundComponent";
import * as S from "./styles";

interface PropsType {
  items: ToolItem[];
}

export interface ToolItem {
  onPress: () => void;
  text: string;
  color: string;
}

const Tool = forwardRef<BottomSheetModal, PropsType>(({ items }, ref) => {
  const { bottom: bottomPad } = useSafeAreaInsets();
  const themeContext = useThemeContext();
  const { animatedSnapPoints, animatedContentHeight, animatedHandleHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

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
    <BottomSheetModal
      ref={ref}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      index={0}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableDismissOnClose
      handleIndicatorStyle={{
        backgroundColor: themeContext.colors.grayscale.scale50,
      }}
      backgroundComponent={StyledBackgroundComponent}
      backgroundStyle={{
        backgroundColor: themeContext.colors.grayscale.scale20,
      }}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <S.Container>
          {items.map((value, index) => (
            <S.Button
              key={value.text}
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
    </BottomSheetModal>
  );
});

Tool.displayName = "Tool";

export default Tool;
