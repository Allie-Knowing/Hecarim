import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";
import { Image } from "react-native";

interface PropsType {
  focused: boolean;
  icon: any;
  routeName: string;
  label: string;
}

const Icon = ({ focused, icon, routeName, label }: PropsType) => {
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
      <S.Label
        style={{
          color: focused
            ? themeContext.colors.primary.default
            : routeName === "feed"
            ? themeContext.colors.grayscale.scale10
            : themeContext.colors.grayscale.scale30,
        }}
      >
        {label}
      </S.Label>
    </S.Container>
  );
};

export default Icon;
