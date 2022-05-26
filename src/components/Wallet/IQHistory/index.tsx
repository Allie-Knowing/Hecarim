import { IQHistoryResponse } from "api/IQHistory";
import { useIQHistory } from "queries/IQHistory";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, Text } from "react-native";
import IQItem from "./IQItem";
import * as S from "./style";
import questionIcon from 'assets/icons/question.png';

const IQHistory: FC = () => {
  const [offset, setOffset] = useState<number>(1);
  const { data, isSuccess, isLoading, isError } = useIQHistory(offset);
  const [history, setHistory] = useState<IQHistoryResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setHistory(history.concat(data));
    }
  }, [data]);

  const pagenation = () => {
    if (!isError) setOffset(offset + 1);
  };

  return (
    <>
      <S.IQHistoryContainer>
        <S.IQHistoryHeader>
          <S.Title>IQ 내역</S.Title>
          <S.IQHistoryButton onPress={() => setIsModalOpen(true)}>
            <S.IQHistoryButtonIcon source={questionIcon} />
          </S.IQHistoryButton>
        </S.IQHistoryHeader>
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
      {
        isModalOpen && (
          <S.ModalBackground onPress={() => setIsModalOpen(false)} height={Dimensions.get("window").height}>
            <S.Modal>
              <S.ModalContent>
                매일 오전 9시에 활동점수가 IQ로 전환됩니다.{"\n"}
                IQ는 추후 KNOW 토큰과 1:1로 전환됩니다.{"\n"}
                노잉 플랫폼에서 발행한 암호화폐 KNOW 토큰은 아래와 같은 용도로 활용됩니다.{"\n"}{"\n"}
                1. 현금 교환{"\n"}
                2. 질문 포상금 걸기
              </S.ModalContent>
            </S.Modal>
          </S.ModalBackground>
        )
      }
    </>
  );
};

export default IQHistory;
