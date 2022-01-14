import { useContext } from "react";
import { TouchableHighlight } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

export const BrandButton = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <S.Container onPress={() => {}} underlayColor={themeContext.colors.primary.click}>
      <S.Label>Hello world</S.Label>
    </S.Container>
  );
};

export default BrandButton;
