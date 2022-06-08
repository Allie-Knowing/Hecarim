import React, { FC } from "react";
import * as S from "./style";

type Props = {
  iq: number;
};

const HoldingIQ: FC<Props> = ({ iq }) => {
  return (
    <>
      <S.IQContainer>
        <S.IQText>보유 IQ: {iq}</S.IQText>
      </S.IQContainer>
      <S.PostScript>최소 출금 가능 IQ 5000</S.PostScript>
    </>
  );
};

export default HoldingIQ;
