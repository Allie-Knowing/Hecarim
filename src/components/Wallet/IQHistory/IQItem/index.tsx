import React, { FC, memo } from "react";
import * as S from "./style";

type Props = {
  item: {
    amount: number;
    created_at: string;
    payment_type: string;
    id: number;
  };
  index: number;
  separators: any;
};

const IQItem: FC<Props> = ({ item }) => {
  const { amount, created_at, payment_type } = item;
  return (
    <S.Container>
      <S.LeftContent>
        <S.Description>{payment_type}</S.Description>
        <S.Date>{created_at}</S.Date>
      </S.LeftContent>
      <S.Point>{amount > 0 ? `+${String(amount)}` : String(amount)} IQ</S.Point>
    </S.Container>
  );
};

export default IQItem;
