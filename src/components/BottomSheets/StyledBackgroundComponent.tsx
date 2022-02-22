import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated from "react-native-reanimated";

const StyledBackgroundComponent: React.FC<BottomSheetBackgroundProps> = ({
  style,
}) => {
  const containerStyle = useMemo(
    () => [
      style,
      {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
    ],
    [style]
  );

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default StyledBackgroundComponent;
