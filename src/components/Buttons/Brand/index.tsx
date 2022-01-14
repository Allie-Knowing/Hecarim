import { useContext } from "react";
import { TouchableHighlight } from "react-native";
import { ThemeContext } from "styled-components/native";
import { ButtonProps } from "..";
import * as S from "./styles";

export const BrandButton = ({ onPress, children }: ButtonProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <S.Container onPress={onPress} underlayColor={themeContext.colors.primary.click}>
        <S.Label>{children}</S.Label>
      </S.Container>
    </>
  );
};

export default BrandButton;
