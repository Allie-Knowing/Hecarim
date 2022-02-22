import BottomSheet from "@gorhom/bottom-sheet";
import { forwardRef, useContext, useState } from "react";
import { View } from "react-native";
import { Portal } from "react-native-portalize";
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

  return (
    <Portal>
      <BottomSheet
        ref={ref}
        snapPoints={["30%"]}
        index={-1}
        onChange={(index) => setIsOpen(index !== -1)}
        backdropComponent={DefaultBackDropComponent(isOpen)}
        enablePanDownToClose
        handleStyle={{
          backgroundColor: themeContext.colors.grayscale.scale20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor: themeContext.colors.grayscale.scale50,
        }}
      >
        <S.Container>
          {items.map((value, index) => (
            <S.Button
              style={{ borderTopWidth: index === 0 ? 0 : 1 }}
              onPress={value.onPress}
            >
              <S.Label color={value.color}>{value.text}</S.Label>
            </S.Button>
          ))}
          <S.Pad style={{ height: bottomPad }} />
        </S.Container>
      </BottomSheet>
    </Portal>
  );
});

export default Tool;
