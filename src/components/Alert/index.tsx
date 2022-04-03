import { forwardRef, useCallback, useImperativeHandle, useMemo } from "react";
import { useTheme } from "styled-components/native";
import {
  Alret as AlretProps,
  Button,
  ButtonColor,
} from "../../context/AlretContext";
import * as S from "./styles";

export interface AlretRef {
  closeAnimation: () => Promise<void>;
}

const Alert = forwardRef<AlretRef, AlretProps>(
  ({ title, content, buttons }, ref) => {
    const theme = useTheme();

    const colorMap = useMemo(
      () =>
        new Map<ButtonColor, string>()
          .set("black", theme.colors.grayscale.scale100)
          .set("red", theme.colors.red.default)
          .set("primary", theme.colors.primary.default),
      [theme]
    );

    const closeAnimation = useCallback(async () => {}, []);

    const onPress = useCallback(
      (value: Button) => async () => {
        value.onPress();

        if (value.type === "close") {
          //닫기
          await closeAnimation();
        }
      },
      [closeAnimation]
    );

    useImperativeHandle(ref, () => ({ closeAnimation }));

    return (
      <S.Container>
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
