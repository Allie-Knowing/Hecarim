import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const SearchHeader: FC = () => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Container topPad={topPad}>
      <S.Box />
      <S.Title topPad={topPad}>검색</S.Title>
    </S.Container>
  );
};

export default SearchHeader;
