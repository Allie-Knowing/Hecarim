import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { ButtonProps } from "..";
import * as S from "./styles";

export const OutlineDestructiveButton = ({ onPress, children }: ButtonProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <S.Container onPress={onPress} underlayColor={themeContext.colors.grayscale.scale20}>
        <S.Label>{children}</S.Label>
      </S.Container>
    </>
  );
};

export default OutlineDestructiveButton;
