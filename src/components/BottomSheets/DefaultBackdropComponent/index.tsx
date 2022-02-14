import { FC, Fragment, useContext, useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemeContext } from "styled-components/native";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";

const { width, height } = Dimensions.get("window");

const DefaultBackDropComponent: FC<BottomSheetBackdropProps> = ({
  animatedIndex,
}) => {
  const themeContext = useContext(ThemeContext);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.6],
      Extrapolate.CLAMP
    ),
    backgroundColor: themeContext.colors.grayscale.scale100,
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  }));

  return (
    <Fragment>
      <Animated.View style={containerAnimatedStyle} pointerEvents="none" />
    </Fragment>
  );
};

export default DefaultBackDropComponent;
