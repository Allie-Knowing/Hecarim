import useFocus from "hooks/useFocus";
import { useContext } from "react";
import { TextInput, TextInputProps } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styled";

const FillInput = (props: TextInputProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <S.Input
      {...(props as TextInput)}
      placeholderTextColor={themeContext.colors.grayscale.scale30}
    />
  );
};

export default FillInput;
