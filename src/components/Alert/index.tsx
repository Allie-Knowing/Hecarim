import useAlret from "hooks/useAlret";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import {
  Alret as AlretProps,
  Button,
  ButtonColor,
} from "../../context/AlretContext";
import * as S from "./styles";

export interface AlretRef {
  closeAnimation: (callback?: () => void) => void;
}

const Alert = forwardRef<AlretRef, AlretProps>(
  ({ title, content, buttons }, ref) => {
    const theme = useTheme();
    const offset = useSharedValue(0);
    const [canEvent, setCanEvent] = useState(false);
    const { closeCurrentAlret } = useAlret();

    const colorMap = useMemo(
      () =>
        new Map<ButtonColor, string>()
          .set("black", theme.colors.grayscale.scale100)
          .set("red", theme.colors.red.default)
          .set("primary", theme.colors.primary.default),
      [theme]
    );

    const closeAnimation = useCallback(
      (callback?: () => void) => {
        setCanEvent(false);

        offset.value = withTiming(
          0,
          {
            duration: 300,
            easing: Easing.out(Easing.quad),
          },
          () => {
            callback();
          }
        );
      },
      [offset]
    );

    const onPress = useCallback(
      (value: Button) => () => {
        value.onPress();

        if (value.type === "close") {
          //닫기
          closeAnimation(closeCurrentAlret);
        }
      },
      [closeAnimation, closeCurrentAlret]
    );

    useImperativeHandle(ref, () => ({ closeAnimation }));

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ scale: 0.9 + 0.1 * offset.value }],
        opacity: offset.value,
      };
    });

    useEffect(() => {
      offset.value = withTiming(
        1,
        {
          duration: 300,
          easing: Easing.out(Easing.quad),
        },
        () => {
          setCanEvent(true);
        }
      );
    }, []);

    return (
      <S.Container
        style={[animatedStyles]}
        pointerEvents={canEvent ? "auto" : "none"}
      >
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
        <S.ButtonContainer>
          {buttons.map((value, index) => (
            <S.Button
              key={`${value.text}_button_${index}`}
              onPress={onPress(value)}
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
