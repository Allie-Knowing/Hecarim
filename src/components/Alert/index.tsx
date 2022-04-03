import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { Alret as AlretProps, ButtonColor } from "../../context/AlretContext";
import * as S from "./styles";

export interface AlretRef {
  closeAnimation: (callback?: () => void) => void;
}

const Alert = forwardRef<AlretRef, AlretProps>(
  ({ title, content, buttons }, ref) => {
    const theme = useTheme();
    const offset = useSharedValue(0);

    const colorMap = useMemo(
      () =>
        new Map<ButtonColor, string>()
          .set("black", theme.colors.grayscale.scale100)
          .set("red", theme.colors.red.default)
          .set("primary", theme.colors.primary.default),
      [theme]
    );

    const closeAnimationLogic = useCallback(
      (callback?: () => void) => {
        const fn = () => {
          offset.value = withTiming(
            0,
            {
              duration: 300,
              easing: Easing.out(Easing.quad),
            },
            () => {
              runOnJS(callback)();
            }
          );
        };
        runOnJS(fn)();
      },
      [offset]
    );

    const closeAnimation = useCallback(
      (callback?: () => void) => {
        runOnJS(closeAnimationLogic)(callback);
      },
      [closeAnimationLogic]
    );

    useImperativeHandle(ref, () => ({
      closeAnimation: closeAnimation,
    }));

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ scale: 0.9 + 0.1 * offset.value }],
        opacity: offset.value,
      };
    });

    useEffect(() => {
      offset.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
    }, [offset]);

    return (
      <S.Container style={[animatedStyles]}>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
        <S.ButtonContainer>
          {buttons.map((value, index) => (
            <S.Button
              key={`${value.text}_button_${index}`}
              onPress={value.onPress}
              underlayColor={theme.colors.grayscale.scale30}
              activeOpacity={1}
            >
              <S.ButtonLabel
                style={{
                  color: colorMap.get(value.color),
                }}
              >
                {value.text}
              </S.ButtonLabel>
            </S.Button>
          ))}
        </S.ButtonContainer>
      </S.Container>
    );
  }
);

export default Alert;
