import { useContext } from "react";
import { Image } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

interface PropsType {
  focused: boolean;
  color: string;
  size: number;
}

const Icon =
  (name: string, iconMap: Map<string, any>, labelMap: Map<string, string>) =>
  ({ focused }: PropsType) => {
    const themeContext = useContext(ThemeContext);
    let tabIcon = iconMap.get(name)!;

    return (
      <S.Container>
        <Image
          source={tabIcon}
          resizeMode="cover"
          style={{
            height: 20,
            width: 20,
            tintColor: !focused
              ? themeContext.colors.grayscale.scale30
              : themeContext.colors.primary.default,
          }}
        />
        <S.Label focused={focused}>{labelMap.get(name)}</S.Label>
      </S.Container>
    );
  };

export default Icon;
