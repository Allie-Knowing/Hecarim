import useFocus from "hooks/useFocus";
import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import * as S from "./styled";

const OutlineInput = () => {
  const [inputProps, isFocus] = useFocus();
  const themeContext = useContext(ThemeContext);

  return (
    <S.Input
      {...inputProps}
      {...{ isFocus }}
      placeholder="hello wo"
      placeholderTextColor={themeContext.colors.grayscale.scale30}
    />
  );
};

export default OutlineInput;
