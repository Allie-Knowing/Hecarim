import React, { FC } from "react";
import * as S from "./style";

type Props = {
  item: {
    title: string;
    date: string;
    point: number;
    id: string;
  };
  index: number;
  separators: any;
};

const IQItem: FC<Props> = ({ item, index }) => {
  const { title, date, point } = item;

  return (
    <S.Container>
      <S.LeftContent>
        <S.Description>{title}</S.Description>
        <S.Date>{date}</S.Date>
      </S.LeftContent>
      <S.Point>{point > 0 ? `+${String(point)}` : String(point)} IQ</S.Point>
    </S.Container>
  );
};

export default IQItem;
