import useAlert from "hooks/useAlert";
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
import useThemeContext from "hooks/useThemeContext";
import { AlertWithId, ButtonColor } from "../../context/AlertContext";
import * as S from "./styles";

export interface AlretRef {
  closeAnimation: (callback?: () => void) => void;
}

const Alert = forwardRef<AlretRef, AlertWithId>(
  ({ title, content, buttons, id }, ref) => {
    const themeContext = useThemeContext();
    const offset = useSharedValue(0);
    const { currentAlertId: currentAlretId } = useAlert();

    const colorMap = useMemo(
      () =>
        new Map<ButtonColor, string>()
          .set("black", themeContext.colors.grayscale.scale100)
          .set("red", themeContext.colors.red.default)
          .set("primary", themeContext.colors.primary.default),
      [themeContext]
    );

    const closeAnimationLogic = useCallback(
      (callback?: () => void) => {
        const fn = () => {
          offset.value = withTiming(
            0,
            {
              duration: 150,
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
      closeAnimation,
    }));

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ scale: 0.9 + 0.1 * offset.value }],
        opacity: offset.value,
      };
    });

    useEffect(() => {
      if (currentAlretId === id) {
        offset.value = withTiming(1, {
          duration: 150,
          easing: Easing.out(Easing.quad),
        });
      }
    }, [currentAlretId, id, offset]);

    return (
      <S.Container style={[animatedStyles]}>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
        <S.ButtonContainer>
          {buttons.map((value, index) => (
            <S.Button
              key={`${value.text}_button_${index}`}
              onPress={() => value.onPress(id)}
              underlayColor={themeContext.colors.grayscale.scale30}
              activeOpacity={1}
              style={[
                index === 0 && { borderBottomLeftRadius: 10 },
                index === buttons.length - 1 && { borderBottomRightRadius: 10 },
                { overflow: "hidden" },
              ]}
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
