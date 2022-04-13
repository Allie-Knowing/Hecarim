import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";
import InputNavigation from "./InputNavigation";

interface Props {
  title: string;
  inputValue: string;
  setInputValue: (e: string) => void;
  checkValue: boolean;
  setCheckValue: (e: boolean) => void;
}

const SearchTopNavigation: FC<Props> = ({
  title,
  inputValue,
  setInputValue,
  checkValue,
  setCheckValue,
}) => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Wrapper topPad={topPad}>
      <InputNavigation
        topPad={topPad}
        title={title}
        inputValue={inputValue}
        setInputValue={setInputValue}
        checkValue={checkValue}
        setCheckValue={setCheckValue}
      />
    </S.Wrapper>
  );
};

export default SearchTopNavigation;
