import React, { FC } from "react";
import { Dimensions } from "react-native";
import MyQuestion from "./MyQuestion";
import * as S from "./style";

const { height } = Dimensions.get("window");

const MyQuestionList: FC = () => {
  return (
    <S.Container height={height - 290}>
      <S.Title>나의 질문</S.Title>
      <S.QuestionContainer
        key={"#"}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={() => <MyQuestion />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          width: "100%",
          paddingRight: 10,
          paddingLeft: 10,
          overflow: "hidden",
        }}
      />
    </S.Container>
  );
};

export default MyQuestionList;
