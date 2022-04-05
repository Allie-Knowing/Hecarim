import axios from "axios";
import { useProfileQuestionList } from "queries/Profile";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import MyQuestion from "./MyQuestion";
import * as S from "./style";

const { height } = Dimensions.get("window");

type Props = {
  userId: number;
};

const MyQuestionList: FC<Props> = ({ userId }) => {
  const { data, isLoading, isError, error } = useProfileQuestionList(userId);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (error && axios.isAxiosError(error) && error.response.status === 404) {
      setIsEmpty(true);
    }
  }, [error]);

  return (
    <S.Container height={height - 290}>
      {data && (
        <View>
          <S.Title>질문</S.Title>
          {data.data.data.length === 0 ? (
            <S.Notice>질문이 없습니다.</S.Notice>
          ) : (
            <S.QuestionContainer
              key={"#"}
              data={data.data.data}
              renderItem={({ item }: any) => <MyQuestion question={item} />}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                width: "100%",
                paddingRight: 10,
                paddingLeft: 10,
                overflow: "hidden",
              }}
            />
          )}
        </View>
      )}
      {isLoading && <S.Notice>잠시만 기다려주세요.</S.Notice>}
      {!isLoading && !isEmpty && isError && (
        <S.Notice>잠시 후 다시 시도하세요.</S.Notice>
      )}
      {isEmpty && !isLoading && (
        <View>
          <S.Title>질문</S.Title>
          <S.Notice>아직 질문이 없습니다.</S.Notice>
        </View>
      )}
    </S.Container>
  );
};

export default MyQuestionList;
