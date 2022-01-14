import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { ButtonProps } from "..";
import * as S from "./styles";

export const Destructive = ({ onPress, children }: ButtonProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <S.Container onPress={onPress} underlayColor={themeContext.colors.red.click}>
        <S.Label>{children}</S.Label>
      </S.Container>
    </>
  );
};

export default Destructive;
