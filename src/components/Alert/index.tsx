import { FC, useMemo } from "react";
import { useTheme } from "styled-components/native";
import { Alret as AlretProps, ButtonColor } from "../../context/AlretContext";
import * as S from "./styles";

const Alert: FC<AlretProps> = ({ title, content, buttons }) => {
  const theme = useTheme();

  const colorMap = useMemo(
    () =>
      new Map<ButtonColor, string>()
        .set("black", theme.colors.grayscale.scale100)
        .set("red", theme.colors.red.default)
        .set("primary", theme.colors.primary.default),
    [theme]
  );

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Content>{content}</S.Content>
      <S.ButtonContainer>
        {buttons.map((value, index) => (
          <S.Button
            key={`${value.text}_button_${index}`}
            onPress={() => {
              value.onPress();

              if (value.type === "close") {
                //닫기
              }
            }}
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
};

export default Alert;
