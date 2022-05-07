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
  const year = created_at.substring(0, 4);
  const month = created_at.substring(5, 7);
  const day = created_at.substring(8, 10);
  const hour = created_at.substring(11, 13);
  const minute = created_at.substring(14, 16);

  return (
    <S.Container>
      <S.LeftContent>
        <S.Description>{payment_type}</S.Description>
        <S.Date>
          {year}년 {month}월 {day}일 {hour}:{minute}
        </S.Date>
      </S.LeftContent>
      <S.Point>{amount > 0 ? `+${String(amount)}` : String(amount)} IQ</S.Point>
    </S.Container>
  );
};

export default IQItem;
