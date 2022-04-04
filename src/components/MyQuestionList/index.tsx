import React, { FC } from "react";
import { Dimensions, Text } from "react-native";
import useProfile from "utils/hooks/profile/useProfile";
import MyQuestion from "./MyQuestion";
import * as S from "./style";

const { height } = Dimensions.get("window");

const MyQuestionList: FC = () => {
  const { state } = useProfile();

  return (
    <S.Container height={height - 290}>
      <S.Title>나의 질문</S.Title>
      {state.questionList.length === 0 ? (
        <S.Notice>질문이 없습니다.</S.Notice>
      ) : (
        <S.QuestionContainer
          key={"#"}
          data={state.questionList}
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
    </S.Container>
  );
};

export default MyQuestionList;
