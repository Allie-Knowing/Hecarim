import { IQHistoryResponse } from "api/IQHistory";
import { useIQHistory } from "queries/IQHistory";
import React, { FC, useEffect, useState } from "react";
import { Text } from "react-native";
import IQItem from "./IQItem";
import * as S from "./style";

const IQHistory: FC = () => {
  const [offset, setOffset] = useState<number>(1);
  const { data, isSuccess, isLoading, isError } = useIQHistory(offset);
  const [history, setHistory] = useState<IQHistoryResponse[]>([]);

  useEffect(() => {
    if (data) {
      setHistory(history.concat(data));
    }
  }, [data]);

  const pagenation = () => {
    if (!isError) setOffset(offset + 1);
  };

  return (
    <S.IQHistoryContainer>
      <S.Title>IQ 내역</S.Title>
      {history ? (
        <S.IQHistoryList
          data={history}
          renderItem={IQItem}
          keyExtractor={(item: IQHistoryResponse) => item.id.toString()}
          onEndReached={pagenation}
          onEndReachedThreshold={0.9}
        />
      ) : (
        <Text>내역이 없습니다.</Text>
      )}
    </S.IQHistoryContainer>
  );
};

export default IQHistory;
