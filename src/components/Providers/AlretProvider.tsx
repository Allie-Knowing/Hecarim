import { Alret, alretContext, AlretWithId } from "context/AlretContext";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import AlretComponent, { AlretRef } from "../Alert";
import { Dimensions } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import uniqueId from "constant/uniqueId";
import { useTheme } from "styled-components";

const { height, width } = Dimensions.get("screen");

const AlretProvider: FC = ({ children }) => {
  const [alrets, setAlrets] = useState<AlretWithId[]>([]);
  const currentAlretRef = useRef<AlretRef>();
  const offset = useSharedValue(0);
  const theme = useTheme();

  const showAlret = useCallback(
    (alret: Alret) => {
      const callback = () => {
        const alretWithId = { ...alret, id: uniqueId() };

        setAlrets([...alrets, alretWithId]);
      };

      if (currentAlretRef.current) {
        currentAlretRef.current.closeAnimation(callback);
      } else {
        callback();
      }
    },
    [alrets]
  );

  const closeAlret = useCallback(
    (id: string) => {
      const callback = () => {
        const copyAlrets = [...alrets];

        copyAlrets.pop();

        setAlrets(alrets.filter((value) => value.id !== id));
      };

      currentAlretRef.current.closeAnimation(callback);
    },
    [alrets]
  );

  const currentAlretId = useMemo(
    () => (alrets.length > 0 ? alrets.reverse()[0].id : null),
    [alrets]
  );

  const changeBackground = useCallback(() => {
    if (alrets.length > 0) {
      offset.value = withTiming(1, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      });
    } else {
      offset.value = withTiming(0, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [alrets.length, offset]);

  useEffect(() => {
    runOnJS(changeBackground)();
  }, [changeBackground]);

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      offset.value,
      [0, 1],
      [
        `${theme.colors.grayscale.scale100}00`,
        `${theme.colors.grayscale.scale100}99`,
      ]
    );

    return { backgroundColor };
  });

  return (
    <alretContext.Provider
      value={{
        showAlret: runOnJS(showAlret),
        closeAlret: runOnJS(closeAlret),
        currentAlretId,
      }}
    >
      {children}
      <Animated.View
        style={[
          {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height,
            width,
          },
          animatedStyles,
        ]}
        pointerEvents={alrets.length > 0 ? "auto" : "none"}
      >
        {alrets.length !== 0 && (
          <AlretComponent
            ref={currentAlretRef}
            key={alrets.reverse()[0].id}
            {...alrets.reverse()[0]}
          />
        )}
      </Animated.View>
    </alretContext.Provider>
  );
};

export default AlretProvider;
