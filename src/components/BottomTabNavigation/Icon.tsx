import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";
import { Image } from "react-native";

interface PropsType {
  focused: boolean;
  color: string;
  size: number;
}

const Icon =
  (icon: any, label: string, routeName: string) =>
  ({ focused }: PropsType) => {
    const themeContext = useContext(ThemeContext);

    return (
      <S.Container>
        <Image
          source={icon}
          style={{
            tintColor: !focused
              ? routeName === "feed"
                ? themeContext.colors.grayscale.scale10
                : themeContext.colors.grayscale.scale30
              : themeContext.colors.primary.default,
            height: 20,
            width: 20,
            resizeMode: "stretch",
          }}
        />
        <S.Label focused={focused}>{label}</S.Label>
      </S.Container>
    );
  };

export default Icon;
