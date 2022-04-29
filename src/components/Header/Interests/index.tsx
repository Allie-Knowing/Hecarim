import React, { FC } from "react";
import * as S from "./style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const InterestsHeader: FC = () => {
  const { top: topPad } = useSafeAreaInsets();
  return (
    <S.HeaderContainer topPad={topPad}>
      <S.Title>관심분야 선택</S.Title>
    </S.HeaderContainer>
  );
};

export default InterestsHeader;
