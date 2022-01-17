import useFocus from "hooks/useFocus";
import { useContext } from "react";
import { TextInput, TextInputProps } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styled";

const OutlineInput = (props: TextInputProps) => {
  const [inputProps, isFocus] = useFocus();
  const themeContext = useContext(ThemeContext);

  return (
    <S.Input
      {...(props as TextInput)}
      {...inputProps}
      {...{ isFocus }}
      placeholderTextColor={themeContext.colors.grayscale.scale30}
    />
  );
};

export default OutlineInput;
