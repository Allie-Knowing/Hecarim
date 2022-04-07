import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";
import InputNavigation from "./InputNavigation";

interface Props {
  title: string;
}

const SearchTopNavigation: FC<Props> = ({ title }) => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Wrapper topPad={topPad}>
      <InputNavigation topPad={topPad} title={title} />
    </S.Wrapper>
  );
};

export default SearchTopNavigation;
