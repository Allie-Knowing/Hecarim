import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileAnswer, ProfileQuestion } from "api/Profile";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { useProfileAnswerList, useProfileQuestionList } from "queries/Profile";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import MyQuestion from "./MyQuestion";
import * as S from "./style";
import Switch from "./Switch";

const { height } = Dimensions.get("window");

type Props = {
  userId: number;
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
  questionCnt: number;
  answerCnt: number;
};

const MyQuestionList: FC<Props> = ({
  userId,
  navigation,
  questionCnt,
  answerCnt,
}) => {
  const {
    data: questionList,
    isLoading,
    isError,
    error,
  } = useProfileQuestionList(userId);
  const { data: answerList } = useProfileAnswerList(userId);
  const [isQuestion, setIsQuestion] = useState<boolean>(true);
  const [profileDataList, setProfileDataList] = useState<
    ProfileQuestion[] | ProfileAnswer[]
  >([]);

  const moveQuestionStack = (index: number) => {
    return;
  };

  useEffect(() => {
    if (isQuestion) {
      setProfileDataList(questionList?.data.data || []);
    } else {
      setProfileDataList(answerList?.data.data || []);
    }
  }, [isQuestion, questionList, answerList]);

  return (
    <S.Container height={height - 290}>
      <Switch isLeft={isQuestion} setIsLeft={setIsQuestion} />
      {profileDataList.length !== 0 && (
        <View>
          <S.Title>
            {isQuestion
              ? `영상 질문 ${questionCnt || 0}개`
              : `영상 답변 ${answerCnt || 0}개`}
          </S.Title>
          <S.QuestionContainer
            key={"#"}
            data={profileDataList}
            renderItem={({ item, index }: { item: any; index: number }) => (
              <MyQuestion
                question={item}
                moveQuestionStack={() => moveQuestionStack(index)}
              />
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              width: "100%",
              paddingRight: 10,
              paddingLeft: 10,
              overflow: "hidden",
            }}
          />
        </View>
      )}
      {isLoading && <S.Notice>잠시만 기다려주세요.</S.Notice>}
      {!isLoading && isError && <S.Notice>잠시 후 다시 시도하세요.</S.Notice>}
      {profileDataList.length === 0 && !isLoading && (
        <View>
          <S.Title>질문</S.Title>
          <S.Notice>아직 질문이 없습니다.</S.Notice>
        </View>
      )}
    </S.Container>
  );
};

export default MyQuestionList;
