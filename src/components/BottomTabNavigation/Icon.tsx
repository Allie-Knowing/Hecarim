import { useContext } from "react";
import { Image } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";
import { SvgCssUri } from "react-native-svg";

interface PropsType {
  focused: boolean;
  color: string;
  size: number;
}

const Icon =
  (icon: any, label: string) =>
  ({ focused }: PropsType) => {
    const themeContext = useContext(ThemeContext);

    return (
      <S.Container>
        <SvgCssUri
          uri={icon}
          fill={
            !focused
              ? themeContext.colors.grayscale.scale30
              : themeContext.colors.primary.default
          }
          style={{
            height: 20,
            width: 20,
          }}
        />
        <S.Label focused={focused}>{label}</S.Label>
      </S.Container>
    );
  };

export default Icon;
