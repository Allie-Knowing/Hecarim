import useFocus from "hooks/useFocus";
import { useContext } from "react";
import { TextInput, TextInputProps } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

const UnderlineInput = (props: TextInputProps) => {
  const themeContext = useContext(ThemeContext);
  const [inputProps, isFocus] = useFocus();

  return (
    <S.Container>
      <S.Input
        {...(props as TextInput)}
        {...inputProps}
        placeholderTextColor={themeContext.colors.grayscale.scale30}
      />
      <S.Line {...{ isFocus }} />
    </S.Container>
  );
};

export default UnderlineInput;
