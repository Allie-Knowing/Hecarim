import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { ButtonProps } from "..";
import * as S from "./styles";

export const DestructiveButton = ({ onPress, children, disabled }: ButtonProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <S.Container
        {...{ disabled }}
        onPress={onPress}
        underlayColor={themeContext.colors.red.click}
      >
        <S.Label>{children}</S.Label>
      </S.Container>
    </>
  );
};

export default DestructiveButton;
