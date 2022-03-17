import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const MyPageHeader = () => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Container topPad={topPad}>
      <S.Title topPad={topPad}>마이페이지</S.Title>
    </S.Container>
  );
};

export default MyPageHeader;
