import React, { FC } from "react";
import * as S from "./style";

interface Props {
  topPad: number;
}

const TitleNavigation: FC<Props> = ({ topPad }) => {
  return (
    <S.Wrapper topPad={topPad}>
      <S.Title topPad={topPad}>검색</S.Title>
    </S.Wrapper>
  );
};

export default TitleNavigation;
