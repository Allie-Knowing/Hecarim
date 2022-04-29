import { useContext, useMemo } from "react";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";
import { Image, ImageStyle, StyleProp } from "react-native";
import { ScreenName } from ".";

interface PropsType {
  focused: boolean;
  color: string;
  size: number;
}

const Icon =
  (icon: any, label: string, routeName: ScreenName, currName: ScreenName) =>
  ({ focused }: PropsType) => {
    const theme = useContext(ThemeContext);

    const tintColor = useMemo(() => {
      if (currName === "question") {
        return undefined;
      }

      if (!focused) {
        if (["feed", "question"].includes(routeName)) {
          return theme.colors.grayscale.scale10;
        }

        return theme.colors.grayscale.scale30;
      }

      return theme.colors.primary.default;
    }, [routeName, focused, theme, currName]);

    const iconStyle = useMemo<StyleProp<ImageStyle>>(() => {
      const style: StyleProp<ImageStyle> = {
        height: 20,
        width: 20,
        resizeMode: "stretch",
      };

      if (currName === "question") {
        return { ...style, height: 48, width: 48 };
      }

      return {
        tintColor: tintColor,
        ...style,
      };
    }, [tintColor, currName]);

    const labelColor = useMemo(() => {
      if (currName === "question") {
        return undefined;
      }

      if (focused) {
        return theme.colors.primary.default;
      }

      if (["feed", "question"].includes(routeName)) {
        return theme.colors.grayscale.scale10;
      }

      return theme.colors.grayscale.scale30;
    }, [routeName, focused, theme]);

    return (
      <S.Container>
        <Image source={icon} style={iconStyle} />
        {currName !== "question" && (
          <S.Label
            style={{
              color: labelColor,
            }}
          >
            {label}
          </S.Label>
        )}
      </S.Container>
    );
  };

export default Icon;
