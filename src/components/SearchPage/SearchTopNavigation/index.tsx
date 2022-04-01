import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";
import InputNavigation from "./InputNavigation";

const SearchTopNavigation: FC = () => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Wrapper topPad={topPad}>
      <InputNavigation topPad={topPad} />
    </S.Wrapper>
  );
};

export default SearchTopNavigation;
