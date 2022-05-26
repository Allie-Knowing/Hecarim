import React, { FC } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import theme from "theme/theme";
import * as S from "./style";

type Props = {
  placeholder: string;
  onChangeValue: (text: string) => void;
  value: number | string;
};

const ExchangeInput: FC<Props> = ({ placeholder, onChangeValue, value }) => {
  console.log(value);

  return (
    <S.Input
      placeholder={placeholder}
      placeholderTextColor={theme.colors.grayscale.scale40}
      onChangeText={onChangeValue}
      value={value === 0 ? "" : value.toString()}
    />
  );
};

export default ExchangeInput;
