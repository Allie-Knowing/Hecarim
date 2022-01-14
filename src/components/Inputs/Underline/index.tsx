import { useContext } from "react";
import { TextInput, TextInputProps } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

const UnderlineInput = (props: TextInputProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <S.Container>
      <S.Input
        {...(props as TextInput)}
        placeholderTextColor={themeContext.colors.grayscale.scale30}
      />
      <S.Line />
    </S.Container>
  );
};

export default UnderlineInput;
