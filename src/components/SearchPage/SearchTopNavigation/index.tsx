import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";
import InputNavigation from "./InputNavigation";
import TitleNavigation from "./TitleNavigation";

const { top: topPad } = useSafeAreaInsets();

const SearchTopNavigation: FC = () => {
  return (
    <S.Wrapper topPad={topPad}>
      <TitleNavigation />
      <InputNavigation />
    </S.Wrapper>
  );
};

export default SearchTopNavigation;
