import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useState } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import DefaultBackDropComponent from "../DefaultBackdropComponent";
import DefaultBackgroundComponent from "../DefaultBackgroundComponent";

export interface CommentBottomSheetRefProps {
  open: () => void;
}

const CommentBottomSheet = forwardRef<CommentBottomSheetRefProps>((_, ref) => {
  const sheetRef = useRef<BottomSheet>(null);

  const handleOpenPress = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({
    open: handleOpenPress,
  }));

  useEffect(() => {
    handleClosePress();
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      enablePanDownToClose
      backdropComponent={DefaultBackDropComponent}
      backgroundComponent={DefaultBackgroundComponent}
      snapPoints={["60%"]}
      index={-1}
      style={{ zIndex: 3 }}
    >
      <View>
        <Text>hello world!</Text>
      </View>
    </BottomSheet>
  );
});

export default CommentBottomSheet;
