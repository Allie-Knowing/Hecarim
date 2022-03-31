import React, { FC } from "react";
import * as S from "./style";

interface Props {
  topPad: number;
}

const Magnify = require("../../../../assets/icons/Search/Vector.png");

const InputNavigation: FC<Props> = ({ topPad }) => {
  return (
    <S.Wrapper topPad={topPad}>
      <S.MagnifyImage source={Magnify} />
      <S.Input topPad={topPad} placeholder="해쉬태그를 입력해주세요.." />
    </S.Wrapper>
  );
};

export default InputNavigation;
