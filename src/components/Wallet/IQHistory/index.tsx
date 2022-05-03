import React, { FC } from "react";
import IQItem from "./IQItem";
import * as S from "./style";

const HISTORY_DATA = [
  { title: "활동점수", date: "5월 3일 19:00", point: 99, id: 1 },
  { title: "답변채택", date: "5월 3일 09:00", point: 800, id: 2 },
  { title: "코인변환", date: "5월 3일 04:00", point: -999, id: 3 },
  { title: "활동점수", date: "5월 3일 00:00", point: 99, id: 4 },
  { title: "코인변환", date: "5월 3일 04:00", point: -999, id: 5 },
  { title: "활동점수", date: "5월 3일 00:00", point: 99, id: 6 },
  { title: "코인변환", date: "5월 3일 04:00", point: -999, id: 7 },
  { title: "활동점수", date: "5월 3일 00:00", point: 99, id: 8 },
  { title: "코인변환", date: "5월 3일 04:00", point: -999, id: 9 },
  { title: "활동점수", date: "5월 3일 00:00", point: 99, id: 10 },
];

const IQHistory: FC = () => {
  return (
    <S.IQHistoryContainer>
      <S.Title>IQ 내역</S.Title>
      <S.IQHistoryList
        data={HISTORY_DATA}
        renderItem={IQItem}
        keyExtractor={(item: { id: number }) => item.id.toString()}
      />
    </S.IQHistoryContainer>
  );
};

export default IQHistory;
